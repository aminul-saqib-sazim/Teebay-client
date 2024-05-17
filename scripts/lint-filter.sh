#!/bin/bash
for file in "$@"; do
    if [[ $file != *"shared/components/shadui"* ]]; then
        eslint --fix --max-warnings=0 "$file"
    fi
done