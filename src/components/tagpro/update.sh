# first argument is jwt, second argument is form id
curl -H "Authorization: $1" https://api.formcake.com/public/v1/form/$2/submission\?limit=1