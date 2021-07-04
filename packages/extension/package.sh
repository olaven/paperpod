CURRENT_DIR=$(pwd)

if [[ $CURRENT_DIR != *paperpod ]]
then
  echo "Looks like you're in the wrong directory.";
  echo "Script expected to be called from paperpod root";
  echo "Was called from $CURENT_DIR";
  exit 1; 
fi


rm -rf node_modules;
yarn extension install --production=true;
zip \
    -r -FS extension-build.zip ./packages/extension \
    --exclude src jest.config.ts jest.setup.ts;
