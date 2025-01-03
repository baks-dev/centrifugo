#
# /* Copyright 2025.  Baks.dev <admin@baks.dev>
#
#  Permission is hereby granted, free of charge, to any person obtaining a copy
#  of this software and associated documentation files (the "Software"), to deal
#  in the Software without restriction, including without limitation the rights
#  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#  copies of the Software, and to permit persons to whom the Software is furnished
#  to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in all
#  copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
#  THE SOFTWARE.*/
#

# chmod +x /etc/centrifugo/update.sh

CENTRIFUGO_VERSION='5.4.8'

service centrifugo stop

if ! test -d /etc/centrifugo; then
  sudo mkdir /etc/centrifugo
fi

if ! test -f /etc/centrifugo/centrifugo_${CENTRIFUGO_VERSION}_linux_amd64.tar.gz; then
  cd /etc/centrifugo || { echo "Директория /etc/centrifugo не найдена"; exit 1; }
  wget https://github.com/centrifugal/centrifugo/releases/download/v${CENTRIFUGO_VERSION}/centrifugo_${CENTRIFUGO_VERSION}_linux_amd64.tar.gz
  tar zxvf centrifugo_${CENTRIFUGO_VERSION}_linux_amd64.tar.gz
fi

rm -rf /usr/bin/centrifugo
mv centrifugo /usr/bin

rm -rf /etc/centrifugo/centrifugo_${CENTRIFUGO_VERSION}_linux_amd64.tar.gz

service centrifugo start

centrifugo version