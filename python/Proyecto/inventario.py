import csv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pywhatkit as kit
from datetime import datetime, timedelta

PRODUCTS_FILE = "instruments.csv"
USERS_FILE = "users.csv"

class InventorySystem:
    def __init__(self):
        self.products = self.load_csv(PRODUCTS_FILE)
        self.users = self.load_csv(USERS_FILE)
        print(f"Productos cargados: {self.products}")  
        print(f"Usuarios cargados: {self.users}")  

    def load_csv(self, filename):
        #Carga datos desde el CSV
        if not os.path.exists(filename):
            print(f"Archivo {filename} no existe. Creando un nuevo archivo.")  
            return []
        try:
            with open(filename, "r", newline="", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                return list(reader)
        except csv.Error as e:
            print(f"Error al leer el archivo CSV {filename}: {e}")
            return []

    def save_csv(self, filename, data, fieldnames):
        # Guarda los datos en un archivo CSV
        try:
            with open(filename, "w", newline="", encoding="utf-8") as file:
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(data)
            print(f"Datos guardados en {filename}: {data}")  
        except Exception as e:
            print(f"Error al guardar en el archivo CSV {filename}: {e}")

    def send_email(self, to_email, name):
        #Envía un correo electrónico usuario registrado
        from_email = "johanny.colman@gmail.com"  
        password = "bqww ctuf mfer vtux"

        subject = "¡Bienvenido a la tienda!"
        body = f"Hola {name},\n\n¡Gracias por registrarte en nuestra tienda! Estamos felices de tenerte con nosotros.\n\nSaludos,\nEl equipo de la tienda."

        try:
            # servidor SMTP
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(from_email, password)

            msg = MIMEMultipart()
            msg["From"] = from_email
            msg["To"] = to_email
            msg["Subject"] = subject

            msg.attach(MIMEText(body, "plain"))

            server.sendmail(from_email, to_email, msg.as_string())
            server.quit()
        except smtplib.SMTPAuthenticationError:
            print("Error: Autenticación fallida. Verifica tu email y contraseña.")
        except Exception as e:
            print(f"Error al enviar correo electrónico: {e}")

    def send_whatsapp(self, phone, name):
        #Envía un mensaje de WhatsApp usuario registrado
        message = f"¡Hola {name}! 🎉 Gracias por registrarte en nuestra tienda. Estamos muy felices de tenerte con nosotros."
        try:
            kit.sendwhatmsg_instantly(f"+{phone}", message, wait_time=10, tab_close=True)
        except Exception as e:
            print(f"Error al enviar mensaje de WhatsApp: {e}")

    def add_product(self, name, price, quantity, category):
        #Agregr producto
        product = {"Nombre": name, "Precio": price, "Cantidad": quantity, "Categoría": category, "Fecha": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        self.products.append(product)
        print(f"Producto agregado: {product}")  # Debugging
        self.save_csv(PRODUCTS_FILE, self.products, product.keys())
        return f"✅ Producto '{name}' agregado exitosamente."

    def add_user(self, name, email, phone, address):
        #Agregar usuario
        user = {"Nombre": name, "Email": email, "Teléfono": phone, "Dirección": address}
        self.users.append(user)
        self.save_csv(USERS_FILE, self.users, user.keys())

        # Enviar correo 
        self.send_email(email, name)
        
        # Enviar WhatsApp
        self.send_whatsapp(phone, name)
        
        return f"✅ Usuario '{name}' agregado exitosamente y se ha enviado un correo y WhatsApp."

    def delete_user(self, email):
        #Elimina un usuario actualiza el CSV
        before_count = len(self.users)
        self.users = [u for u in self.users if u["Email"] != email]
        after_count = len(self.users)

        if before_count == after_count:
            return f"⚠️ Usuario con email '{email}' no encontrado."
        if len(self.users) > 0:
            self.save_csv(USERS_FILE, self.users, self.users[0].keys())
        else:
            open(USERS_FILE, "w").close() 
         return f"🗑️ Usuario con email '{email}' eliminado exitosamente."

         # Muestra elementos
    def list_items(self, items, item_type, page=1, per_page=12):
        if not items:
            print(f"⚠️ No hay {item_type} registrados.")
            return []

        total_pages = (len(items) + per_page - 1) // per_page
        start = (page - 1) * per_page
        end = start + per_page
        paginated_items = items[start:end]

        print(f"\n📄 Página {page} de {total_pages}")
        for i, item in enumerate(paginated_items, start=start + 1):
            print(f"{i}. {item}")
        return paginated_items

    # Sistema De inventario

def menu():
    system = InventorySystem()

    while True:
        print("\n--- Menú de Inventario ---")
        print("1. Agregar Producto")
        print("2. Eliminar Producto")
        print("3. Agregar Usuario")
        print("4. Eliminar Usuario")
        print("5. Lista Productos")
        print("6. Lista Usuarios")
        print("7. Salir")

        choice = input("Selecciona una opción: ")

        if choice == '1':
            name = input("Nombre del producto: ")
            price = input("Precio del producto: ")
            quantity = input("Cantidad del producto: ")
            category = input("Categoría del producto: ")
            print(system.add_product(name, price, quantity, category))

        elif choice == '2':
            name = input("Nombre del producto a eliminar: ")
            print(system.delete_product(name))

        elif choice == '3':
            name = input("Nombre del usuario: ")
            email = input("Email del usuario: ")
            phone = input("Teléfono del usuario: ")
            address = input("Dirección del usuario: ")
            print(system.add_user(name, email, phone, address))

        elif choice == '4':
            email = input("Email del usuario a eliminar: ")
            print(system.delete_user(email))

        elif choice == '5':
            page = int(input("Número de página: "))
            system.list_items(system.products, "productos", page)

        elif choice == '6':
            page = int(input("Número de página: "))
            system.list_items(system.users, "usuarios", page)

        elif choice == '7':
            print("👋 Saliendo del sistema...")
            break

        else:
            print("⚠️ Opción no válida. Por favor, selecciona una opción del 1 al 7.")

if __name__ == "__main__":
    menu()
