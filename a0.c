#include <stdio.h>
typedef struct objeto { int aProperty; } tipo [1];
void test (tipo o) { o->aProperty = 27; }
int main (void) {
  tipo o;
  test(o);
  printf ("%d\n", o->aProperty);
  return 0;
}

/*
Pass by reference in C
Esto demuestra como se pueden pasar objetos por referencia sin usar el operador &

gcc a0.c
./a0.out
--> 27
*/