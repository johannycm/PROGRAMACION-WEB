""""
 Crea un programa que sea un sistema de inventario de una tienda, el programa debe tener las siguientes opciones:
  1) - Agregar un producto
  2) - Eliminar un producto
  3) - Ver todos los productos

  El programa debe tener un arreglo de productos y cada producto debe tener los siguientes atributos:
  - Nombre
  - Precio
  - Cantidad

  Una vez que se agregue un producto se debe mostrar un mensaje de "Producto agregado correctamente"
  y debe de haber una espera de 3 segundos antes borrar toddos los mensajes de la terminal
  y mostrar el menu nuevamente.

  Debes de utilizar funciones, loops y condicionales o metodos de listas y diccionarios.

  Fecha de entrega: 06/02/25 """

import time
import os

def limpiar():
  time.sleep(5)
  os.system("cls")

class Producto:
  def __init__(self, nombre, precio, cantidad):
    self.nombre = nombre
    self.precio = precio
    self.cantidad = cantidad

  def __str__ (self):
    return f"Nombre: {self.nombre}, Precio: {self.precio}, Cantidad: {self.cantidad}"

inventario = []

def agregar_producto():
  nombre = input("Nombre del producto: ")
  precio = float(input("Precio del producto: "))
  cantidad = int(input("Cantidad del producto: "))

  producto = {"nombre": nombre, "precio": precio, "cantidad": cantidad}
  inventario.append(producto)

  print("Producto agregado correctamente")
  limpiar()

def eliminar_producto():
  nombre = input("Nombre del producto a eliminar: ")
  for producto in inventario:
    if producto["nombre"] == nombre:
      inventario.remove(producto)
      print("Producto eliminado correctamente")
    else:
      print("Producto no encontrado")
  limpiar()

def ver_Productos():
  if not inventario:
    print("No hay productos en el inventario")
  else:
        print("\nLista de productos:")
        for producto in inventario:
            print(producto)
    input("\nPresiona Enter para continuar...")
    limpiar()
    
def mostrar_menu():
  while True:
    print("Inventario de la tienda")
    print("1) Agregar un producto")
    print("2) Eliminar un producto")
    print("3) Ver todos los productos")
    print("4) Salir")

    opcion = input("Selecciona una opcion: ")

    if opcion == "1":
      agregar_producto()

    elif opcion == "2":
      eliminar_producto()

    elif opcion == "3":
      ver_Productos()

    elif opcion == "4":
      print ("Gracias por usar el sistema de inventario")
      break

    else:
      print("Opcion no valida")
      limpiar()

mostrar_menu()