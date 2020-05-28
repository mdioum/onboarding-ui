#!/usr/bin/env sh

find '/var/www/html' -name '*.js' -exec sed -i -e 's,API_BASE_URL,'"$API_BASE_URL"',g' {} \;
exec /usr/sbin/nginx -g 'daemon off;' "$@"
