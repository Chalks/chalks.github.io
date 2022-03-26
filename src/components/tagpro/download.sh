echo "This script downloads a texture pack and all its files from tagpro.gg"
echo "and then puts those files into the static directory. If provided with"
echo "a formcake form id it will also post a record of those files to formcake."

OUTPUT_DIR="${OUTPUT_DIR:-../../static/tagpro}"
echo "Current OUTPUT_DIR: $OUTPUT_DIR"

echo "Formcake form id: \c"
read fc_id

echo "Server directory: \c"
read tagpro_dir

echo "Texture name: \c"
read name

echo "Author name: \c"
read author

echo "-----"

echo "Continue? (Y)/n: \c"
read doit
doit="${doit:-Y}"


download_and_post () {
    echo "Downloading $1.png"

    filename="$tagpro_dir-$1.png"
    file="$OUTPUT_DIR/$filename"
    curl "https://static.koalabeast.com/textures/$tagpro_dir/$1.png" -f --output "$file"
    if test -f "$file"; then
        echo "$filename downloaded successfully."

        if [[ ! -z "$fc_id" ]]; then
            echo "Submitting to Formcake"
            curl -X POST "https://api.formcake.com/api/form/$fc_id/submission" -H 'Content-Type: application/json' -d "{\"name\":\"$name\", \"author\":\"$author\", \"filename\":\"$filename\", \"type\":\"$1\"}"
        fi
    else
        echo "$filename not found"
    fi
}

if [ "$doit" == "Y" ]; then
    download_and_post "tiles"
    download_and_post "speedpad"
    download_and_post "speedpadred"
    download_and_post "speedpadblue"
    download_and_post "portal"
    download_and_post "portalred"
    download_and_post "portalblue"
    download_and_post "splats"
    download_and_post "gravitywell"
else
    echo "Aborted..."
fi
