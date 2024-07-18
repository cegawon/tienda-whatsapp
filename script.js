document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCartButton = document.getElementById('closeCart');
    const clearCartButton = document.getElementById('clearCart');
    const sendOrderButton = document.getElementById('sendOrder');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartTotalBubble = document.getElementById('cartTotalBubble');
    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const item = event.target.closest('.menu-item');
            const itemName = item.dataset.name;
            const itemPrice = parseFloat(item.dataset.price);

            const existingItem = cart.find(cartItem => cartItem.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    sendOrderButton.addEventListener('click', () => {
        // Construir el mensaje para WhatsApp
        const message = buildWhatsAppMessage();

        // Abrir WhatsApp con el mensaje
        const whatsappURL = `https://wa.me/573008334903/?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        // Limpiar carrito y actualizar la interfaz
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });

    document.querySelectorAll('.filter-category').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.dataset.category;
            document.querySelectorAll('.menu-category').forEach(section => {
                section.style.display = section.dataset.category === category ? 'block' : 'none';
            });
        });
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $ ${item.price} x ${item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotalSpan.textContent = total;
        cartTotalBubble.textContent = cart.length;
    }

function buildWhatsAppMessage() {
    let message = 'Factura de Pedido:\n\n';
    message += '======================\n';

    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - $${(item.price * item.quantity)}\n`;
    });

    message += '\n======================\n';
    message += `Tipo de entrega: ${document.getElementById('deliveryType').value}\n`;
    message += `Total: $${calculateTotal()}`;

    return message;
}



    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }
});