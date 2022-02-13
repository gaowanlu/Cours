#include <stdio.h>
#include <stdlib.h>
#include <emscripten/emscripten.h>
#include <string.h>

/*
rm -rf ../public/assembly/* & emcc main.cpp -s WASM=1 -o ../public/assembly/main.js -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']"
*/

const size_t MEMORY_SIZE = 1024;
char DATA[MEMORY_SIZE];

int main(int argc, char **argv)
{
    return 0;
}



#ifdef __cplusplus
extern "C"
{
#endif

    int EMSCRIPTEN_KEEPALIVE myFunction()
    {
        return (int)strlen(DATA);
    }

    int EMSCRIPTEN_KEEPALIVE add(int a, int b)
    {
        return a + b;
    }

    char *EMSCRIPTEN_KEEPALIVE getOffset()
    {
        return DATA;
    }

#ifdef __cplusplus
}
#endif
