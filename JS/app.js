
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const selectedSeat = document.getElementById('selected-seat');
const totalSeatBooked = document.getElementById('total-seat-booked');
const availableSeat = document.getElementById('available-seat');
const totalPrice = document.getElementById('total-price');
const couponField = document.getElementById('coupon-field');
const couponBtn = document.getElementById('coupon-btn');
const defaultText = document.getElementById('default-text');
const grandTotal = document.getElementById('grand-total');
const phoneNumber = document.getElementById("phone-number");
const nextBtn = document.getElementById('nextButton');
const continueBtn = document.getElementById('btn-continue');

// Menu icons
menuBtn.addEventListener('click', function () {
    menuBtn.children[0].classList.toggle("hidden");
    const menuCloseBtn = document.getElementById("close-icon");
    menuCloseBtn.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
})


// All Ticket Calculation
let selectedSeatBooking = [];
let currentTotalPrice = 0;
function handleSeatClick(event){
    // console.log(selectedSeatBooking);
    // if(selectedSeatBooking.length >= 4){
    //     return alert("Maximum seat booked!");
    // }
    
    if(selectedSeatBooking.includes(event.innerText)){
        return alert('Seat already booked!');
    }else if(selectedSeatBooking.length < 4){
        //Clicked any seat in Added background and color 
        event.classList.add("bg-primary");
        event.classList.add('text-white');


        // Increase Seat Booking
        selectedSeatBooking.push(event.innerText);
        totalSeatBooked.innerText = selectedSeatBooking.length;

        // Decrease Available Seat
        const availableSeatValue = parseInt(availableSeat.innerText);
        let newAvailableSeat = availableSeatValue - 1;
        availableSeat.innerText = newAvailableSeat;

        // Remove Default text
        defaultText.classList.add('hidden');
        //Added Seat Booking History
        selectedSeat.innerHTML += `
            <li class="flex justify-between bg-gray-100 p-2 border-b-2">
                <span>${event.innerText}</span>
                <span>Economy</span>
                <span>550</span>
            </li>
        `;

        // Updated Total Price
        currentTotalPrice += 550;
        totalPrice.innerText = currentTotalPrice.toFixed(2);

        // Active Coupon
        if(selectedSeatBooking.length > 3){
            couponField.removeAttribute('disabled');
            couponBtn.removeAttribute('disabled');
        }
    }
    else{
        return alert("Maximum seat booked!");
    }

}

// Apply Coupon
couponBtn.addEventListener('click', function(){
    const couponFieldValue = couponField.value;
    // let couponSaveMoney = 0;
    // if(couponFieldValue !== "NEW50" && couponFieldValue !== "Couple 20"){
    //     return alert("Your Provided Coupon Code Is Not Valid 😕");
    // }
    // else if(couponFieldValue === "NEW50"){
    //     couponSaveMoney = currentTotalPrice * .15;
    // }
    // else if(couponFieldValue === "Couple 20"){
    //     couponSaveMoney = currentTotalPrice * .20;
    // }

    // Apply Coupon Condition
    // Short Way
    let couponSaveMoney = 0;
    if(couponFieldValue === "NEW50"){
        couponSaveMoney = currentTotalPrice * .15;
    }
    else if(couponFieldValue === "Couple 20"){
        couponSaveMoney = currentTotalPrice * .20;
    }
    else{
        return alert("Your Provided Coupon Code Is Not Valid 😕");
    }

    const grandTotalValue = currentTotalPrice - couponSaveMoney;
    grandTotal.innerText = grandTotalValue.toFixed(2);

    // Show Coupon Discount Price
    const showCouponDiscountPrice =  document.getElementById('show-coupon-price');
    showCouponDiscountPrice.innerHTML = `
        <div class="text-lg font-semibold flex justify-between w-full">
            <p>Discount Price</p>
            <p>
                <span>-BDT: </span>
                <span>${couponSaveMoney}</span>
            </p>
        </div>
    `;
})

// Active Next Btn with 11 digit phone number
phoneNumber.addEventListener('input', function(event){
    const inputValue = event.target.value
    console.log(inputValue);
    if(inputValue.length >= 11){
        nextBtn.removeAttribute('disabled');
    }
    else{
        nextBtn.setAttribute('disabled', true);
    }
})


// Page Reload
continueBtn.addEventListener('click', function(){
    window.location.reload();
})