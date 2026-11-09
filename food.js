document.addEventListener("DOMContentLoaded", function () {
    // Order form elements
    const orderForm = document.getElementById("orderForm");
    const food = document.getElementById("foodChoice");
    const quantity = document.getElementById("foodQuantity");
    const total = document.getElementById("orderTotal");

    // Calculate order total
    function calculateTotal() {
        const price = Number(food.value);
        const qty = Number(quantity.value);

        if (food.value !== "" && price > 0 && qty >= 1) {
            total.textContent = price * qty;
        } else {
            total.textContent = 0;
        }
    }

    // Check that order form elements exist
    if (orderForm && food && quantity && total) {

        total.textContent = 0;

        food.addEventListener("change", calculateTotal);
        quantity.addEventListener("input", calculateTotal);

        // Handle order submission
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!orderForm.checkValidity()) {
                orderForm.reportValidity();
                return;
            }

            const customerName = document.getElementById("customerName").value.trim();
            const customerPhone = document.getElementById("customerPhone").value.trim();

            const price = Number(food.value);
            const qty = Number(quantity.value);

            if (
                customerName === "" ||
                customerPhone === "" ||
                food.value === "" ||
                price <= 0 ||
                !Number.isInteger(qty) ||
                qty < 1
            ) {
                alert("Please enter valid order details.");
                return;
            }

            // Update the total
            calculateTotal();

            // Put order details into the modal
            document.getElementById("confirmName").textContent =
                customerName;

            document.getElementById("confirmPhone").textContent =
                customerPhone;

            document.getElementById("confirmFood").textContent =
                food.options[food.selectedIndex].text;

            document.getElementById("confirmQuantity").textContent =
                qty;

            document.getElementById("confirmTotal").textContent =
                total.textContent;

            // Open Bootstrap confirmation modal
            const modalElement = document.getElementById("orderModal");

            const orderModal = bootstrap.Modal.getOrCreateInstance(modalElement);

            orderModal.show();

            // Reset the order form after showing the confirmation
            orderForm.reset();
            total.textContent = 0;
        });

        // Reset total when the reset button is used
        orderForm.addEventListener("reset", function () {
            total.textContent = 0;
        });

    } else {
        console.error(
            "Order form error: Check orderForm, foodChoice, " +
            "foodQuantity, and orderTotal IDs."
        );
    }


    // Contact form elements
    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");

    // Handle contact form submission
    if (contactForm && contactSuccess) {

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            contactForm.reset();

            contactSuccess.classList.remove("d-none");

            contactSuccess.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });

        // Hide the success message when manually resetting
        contactForm.addEventListener("reset", function () {
            contactSuccess.classList.add("d-none");
        });

    } else {
        console.error(
            "Contact form error: Check contactForm and contactSuccess IDs."
        );
    }

});
