#include <stdio.h> 
typedef struct objeto { int aProperty; } tipo; 
void test (tipo* o) { o->aProperty = 27; } 
int main (void) { 
  tipo o; 
  test(&o); 
  printf ("%d\n", o.aProperty); 
  return 0; 
}

/*
Pass by reference in C
Esto demuestra como se pueden pasar objetos por referencia usando el operador &

gcc a1.c
./a1.out
--> 27
*/