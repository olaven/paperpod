CURRENT_DIR=$(pwd)
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')


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
zip -r extension-${PACKAGE_VERSION}.zip . -x */\.* *.git* \.* *.zip *.swp *src* *.cache* jest.setup.ts jest.config.ts
