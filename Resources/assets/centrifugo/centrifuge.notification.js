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

/** Уведомления */

executeFunc(function init_centrifugo_notification_qKWmx1KEt()
{

    if(typeof centrifuge !== "object")
    {
        return false;
    }

    if(window.current_profile)
    {

        /** Канал с уведомлениями для профиля, КОТОРОМУ выдана доверенность (пользователь) */
        const personal_notification_channel = centrifuge.newSubscription(window.current_profile + '_notification');

        personal_notification_channel.on("publication", function(ctx)
        {

            if(ctx.data.profile === window.current_profile)
            {
                let notification = `{
                      "type": "${ctx.data.type}",
                      "header": "${ctx.data.header}",
                      "message": "${ctx.data.message}"
                    }`;

                createToast(JSON.parse(notification));
            }

        }).subscribe();


    }

    if(window.profile_id)
    {

        /** Канал с уведомлениями для профиля, КОТОРЫЙ выдал доверенность (магазин) */
        const profile_notification_channel = centrifuge.newSubscription(window.profile_id + '_notification');

        profile_notification_channel.on("publication", function(ctx)
        {

            if(ctx.data.profile === window.profile_id)
            {
                let notification = `{
                      "type": "${ctx.data.type}",
                      "header": "${ctx.data.header}",
                      "message": "${ctx.data.message}"
                    }`;

                createToast(JSON.parse(notification));
            }

        }).subscribe();
    }

    return true;

}, 100);