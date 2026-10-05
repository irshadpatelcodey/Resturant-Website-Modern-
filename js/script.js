var quantities = document.querySelectorAll('.qty');
var totalBox = document.getElementById('total');
var subtotalBox = document.getElementById('subtotal');
var deliveryBox = document.getElementById('delivery');
var discountBox = document.getElementById('discount');

function toggleMenu() {
    var nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('show');
}

function calculateTotal() {
    if (!totalBox) return;
    var subtotal = 0;
    for (var i = 0; i < quantities.length; i++) {
        var qty = Number(quantities[i].value);
        var price = Number(quantities[i].getAttribute('data-price'));
        if (qty < 0) {
            qty = 0;
            quantities[i].value = 0;
        }
        subtotal += qty * price;
    }
    var delivery = subtotal === 0 ? 40 : (subtotal >= 500 ? 0 : 40);
    var discount = subtotal >= 500 ? Math.round(subtotal * 0.10) : 0;
    var total = subtotal + delivery - discount;
    subtotalBox.textContent = '₹' + subtotal;
    deliveryBox.textContent = '₹' + delivery;
    discountBox.textContent = '₹' + discount;
    totalBox.textContent = '₹' + total;
}

for (var i = 0; i < quantities.length; i++) {
    quantities[i].addEventListener('input', calculateTotal);
}
calculateTotal();

function placeOrder(event) {
    event.preventDefault();
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var address = document.getElementById('address').value.trim();
    var selected = 0;
    for (var i = 0; i < quantities.length; i++) {
        selected += Number(quantities[i].value);
    }
    var message = document.getElementById('orderMessage');
    if (name === '' || phone === '' || address === '') {
        message.textContent = 'Please fill all required details.';
        return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        message.textContent = 'Please enter a valid 10 digit phone number.';
        return;
    }
    if (selected === 0) {
        message.textContent = 'Please select at least one food item.';
        return;
    }
    message.textContent = 'Order placed successfully! Total ' + totalBox.textContent;
    document.getElementById('orderForm').reset();
    calculateTotal();
}

function sendMessage(event) {
    event.preventDefault();
    var message = document.getElementById('contactMessage');
    message.textContent = 'Thank you! Your message has been sent.';
    event.target.reset();
}
