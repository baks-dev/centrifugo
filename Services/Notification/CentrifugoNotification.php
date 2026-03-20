<?php
/*
 *  Copyright 2026.  Baks.dev <admin@baks.dev>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is furnished
 *  to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 */

declare(strict_types=1);

namespace BaksDev\Centrifugo\Services\Notification;

use BaksDev\Centrifugo\Server\Presence\CentrifugoPresence;
use BaksDev\Centrifugo\Server\Publish\CentrifugoPublish;
use BaksDev\Core\Messenger\MessageDispatchInterface;
use BaksDev\Support\BaksDevSupportBundle;
use BaksDev\Support\Messenger\Notification\AddSupportNotificationMessage;
use BaksDev\Users\Profile\UserProfile\Repository\CurrentUserProfile\CurrentUserProfileInterface;
use BaksDev\Users\Profile\UserProfile\Type\Id\UserProfileUid;
use BaksDev\Users\User\Type\Id\UserUid;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Target;

/**
 * Публикация уведомлений в канал Centrifugo, с возможностью их сохранения
 */
final class CentrifugoNotification
{
    public const string CHANNEL_NAME = 'notification';

    private CentrifugoNotificationDTO|false $notification = false;

    private UserProfileUid|false $profile = false;

    public function __construct(
        #[Target('centrifugoLogger')] private readonly LoggerInterface $logger,
        private readonly CentrifugoPublish $centrifugoPublish,
        private readonly CentrifugoPresence $centrifugoPresence,
        private readonly MessageDispatchInterface $messageDispatch,
        private readonly ?CurrentUserProfileInterface $currentUserProfileRepository = null,
    ) {}

    /**
     * Уведомление для публикации
     */
    public function addNotification(CentrifugoNotificationDTO $notification): self
    {
        $this->notification = $notification;
        return $this;
    }

    /**
     * Получатель уведомления
     *
     * @note в зависимости от типа получатель будет отличаться
     * - UserUid - конкретный получатель - пользователь
     * - UserProfileUid - общий получатель - магазин
     */
    public function receiver(UserUid|UserProfileUid $receiver): self
    {
        if($receiver instanceof UserUid)
        {
            $CurrentUserProfileDTO = $this->currentUserProfileRepository?->getCurrentUserProfile(new UserUid($receiver));
            $receiver = $CurrentUserProfileDTO?->getId();
        }

        $this->profile = $receiver;

        return $this;
    }

    /**
     * @param bool $save - нужно ли пытаться сохранять уведомление в случае отсутствия подписчика
     */
    public function notify(bool $save): void
    {


        /**
         * Если не был установлен получатель - не реагируем
         */
        if(false === $this->profile instanceof UserProfileUid)
        {
            $this->logger->warning(
                message: 'centrifugo: Не установлен получатель для отправки уведомления',
                context: [
                    self::CHANNEL_NAME,
                    self::class.':'.__LINE__,
                ],
            );

            return;
        }

        $channel = $this->profile.'_'.self::CHANNEL_NAME;

        /**
         * Если не было добавлено уведомление - не реагируем
         */
        if(false === $this->notification instanceof CentrifugoNotificationDTO)
        {
            $this->logger->warning(
                message: 'centrifugo: Попытка отправки пустого уведомления',
                context: [
                    $channel,
                    self::class.':'.__LINE__,
                ],
            );

            return;
        }

        /**
         * Проверяем подписчиков на канал
         */
        $isPresence = $this->centrifugoPresence
            ->get($channel, true) // минимум информации
            ->isPresence();

        if(null === $isPresence)
        {
            return;
        }

        /**
         * Если есть подписчики на этот канал -
         * отправляем уведомление синхронно в centrifugo
         */
        if(true === $isPresence)
        {
            $notification = $this->centrifugoPublish
                ->addData(['profile' => (string) $this->profile])
                ->addData($this->notification->toArray());

            $notification->send($channel);

            if($notification->isError())
            {
                $this->logger->critical(
                    message: 'centrifugo: Ошибка при отправке уведомления в Centrifugo',
                    context: [
                        $notification->getMessage(),
                        $channel,
                        self::class.':'.__LINE__,
                    ],
                );
            }

            return;
        }

        /**
         * Сохраняем сообщение, если:
         * - нет подписчиков на этот канал
         * - уведомление отмечено для сохранения
         */

        if(false === $isPresence && true === $save)
        {
            /**
             * Для сохранения уведомлений должен быть установлен модуль Support
             */

            if(false === class_exists(BaksDevSupportBundle::class))
            {
                $this->logger->critical(
                    message: 'centrifugo: Не возможно сохранить уведомление - не установлен модуль '.BaksDevSupportBundle::class,
                    context: [
                        $channel,
                        self::class.':'.__LINE__,
                    ],
                );

                return;
            }


            /**
             * Сохраняем уведомление асинхронно
             */

            if(true === class_exists(BaksDevSupportBundle::class))
            {
                $data = json_encode($this->notification->toArray());

                $message = new AddSupportNotificationMessage(
                    data: $data,
                    profile: $this->profile,
                );

                $this->messageDispatch
                    ->dispatch(
                        message: $message,
                        transport: 'support',
                    );
            }
        }
    }
}
