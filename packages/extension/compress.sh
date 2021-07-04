CURRENT_DIR=$(pwd)

if [[ $CURRENT_DIR != *extension ]]
then
  echo "Looks like you're in the wrong directory.";
  echo "Script expected to be called from /packages/extension";
  echo "The recommended way to run is with \"yarn extension compress\" from root";
  echo "Was called from $CURENT_DIR";
  exit 1; 
fi


rm -rf node_modules;
yarn extension install --production=true;
zip -r extension-build.zip . -x */\.* *.git* \.* *.zip *.swp *src* *.cache* jest.setup.ts jest.config.ts
