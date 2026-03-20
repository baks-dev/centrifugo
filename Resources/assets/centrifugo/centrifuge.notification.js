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

let reload__qKWmx1KEt = 100;

setTimeout(function init_centrifugo_notification_qKWmx1KEt()
{

    if(typeof centrifuge !== "object")
    {
        if(reload__qKWmx1KEt > 1000)
        { return; }

        reload__qKWmx1KEt = reload__qKWmx1KEt * 2;
        return setTimeout(init_centrifugo_notification_qKWmx1KEt, reload__qKWmx1KEt);
    }

    //console.log('centrifugo_token ->', window.centrifugo_token)
    //console.log('profile_id ->', window.profile_id)
    //console.log('current_profile ->', window.current_profile)

    if(window.current_profile)
    {

        /** Канал с уведомлениями для профиля, КОТОРОМУ выдана доверенность (пользователь) */
        const personal_notification_channel = centrifuge.newSubscription(window.current_profile + '_notification');

        personal_notification_channel.on("publication", function(ctx)
        {
            //console.log('ctx ->', ctx)

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
            //console.log('ctx ->', ctx)

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


}, 100);