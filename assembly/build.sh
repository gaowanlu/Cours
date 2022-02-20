rm -rf ../public/assembly/* & \
emcc \
main.cpp \
-s WASM=1 \
-o ../cours-react/public/assembly/main.js \
-s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']" 

echo "=>BUILD END";