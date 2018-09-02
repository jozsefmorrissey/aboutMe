#!/bin/#!/usr/bin/env bash

tagsToIgnore=('br' 'input')
ignoreTag () {
  for tag in "${tagsToIgnore[@]}"
  do
    tagReg="^$tag.*>"
    echo $1:$tagReg
    if [[ $1 =~ $tagReg ]]
    then
      return 1;
    fi
  done

  return 0;
}

count=0;
textMarker='%%%%REMOVE_ME%%%%'
for fname in $(find ./searchFileScripts -name '*.html');
do
  flines='cat $fname'
  ignoreFirst='true'
  echo -n "<" >> $fname
  contents=""
  while IFS= read -r -d '<' line; do
    # logic
    echo "$line"
    reg="^.*msg-id='[0-9]*'"
    endTagReg="^/.*>"
    commentReg="^!--.*-->"
    hasCloseTagReg="^.*>.*"
    if [[ $line =~ $reg ]] || [[ $line =~ $endTagReg ]] || [[ $line =~ $commentReg ]] || ! [[ $line =~ $hasCloseTagReg ]];
    then
      newLine="<"$line
      # echo New Line "$newLine"
    else
      if [[ $line =~ $hasCloseTagReg ]]
      then
        ignoreTag "$line"
        ignore=$?
        echo ignore Result!!!!! $ignore
        if [[ $ignore == 1 ]]
        then
          newLine="<$line"
        else
          carrotIndex=$(echo $line | grep -aob ">" | grep -o "[0-9]*")
          prefix=$(echo -n "${line:0:carrotIndex}$textMarker")
          echo pre"$prefix"fix
          suffix=$(echo -n "${line:carrotIndex}$textMarker")
          echo fix"$suffix"suf
          newLine=$(echo -n "<$prefix msg-id='$count'$suffix")
          # echo New Line "$newLine"

          let "count++"
        fi
      else
        newLine=$line
      fi
    fi
    contents=$contents$newLine
    # use a second 'read ... <<< "$line"' if we need to tokenize the line
  done < $fname
  contents=$(echo -n "${contents:1}")
  contents=$(echo -n "$contents" | sed s/$textMarker//g)
  echo $fname
  echo "$contents" > $fname".tmp"
done
