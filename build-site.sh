#!/usr/bin/env bash

PAGES_DIRECTORY="./pages/"
HEADER_FILE="./header.html"
FOOTER_FILE="./footer.html"

STATIC_INCLUDES=("style" "script" "slick")

rm -R out
mkdir out

for file in $(ls "$PAGES_DIRECTORY"); do
    cat "$HEADER_FILE" "$PAGES_DIRECTORY/$file" "$FOOTER_FILE" > "out/$file"
done

for file in ${STATIC_INCLUDES[*]}; do
    echo $file
    ln -s "$file" -T "out/$file"
done
