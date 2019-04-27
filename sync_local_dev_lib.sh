#!/bin/bash

if [ ! -d "./node_modules/react-native-vxg-mobile-sdk" ]; then
   mkdir -p "./node_modules/react-native-vxg-mobile-sdk"
fi

rsync -vru ../../react-native-vxg-mobile-sdk.git/src ./node_modules/react-native-vxg-mobile-sdk/ --delete-after
rsync -vru ../../react-native-vxg-mobile-sdk.git/android ./node_modules/react-native-vxg-mobile-sdk/ --delete-after
rsync -vru ../../react-native-vxg-mobile-sdk.git/ios ./node_modules/react-native-vxg-mobile-sdk/ --delete-after
rsync -vru ../../react-native-vxg-mobile-sdk.git/package.json ./node_modules/react-native-vxg-mobile-sdk/ --delete-after
