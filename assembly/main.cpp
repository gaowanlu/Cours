#include <stdio.h>
#include <emscripten/emscripten.h>
/*
rm -rf ../public/assembly/* & emcc main.cpp -s WASM=1 -o ../public/assembly/main.js -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']"
*/
int main(int argc, char **argv)
{
    return 0;
}
#ifdef __cplusplus
extern "C"
{
#endif

    char *EMSCRIPTEN_KEEPALIVE myFunction(int argc, char **argv)
    {
        return "我的函数已被调用\n";
    }

    int EMSCRIPTEN_KEEPALIVE add(int a, int b)
    {
        return a + b;
    }

#ifdef __cplusplus
}
#endif
