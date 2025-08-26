      // Simple form validation for donation amount
      document.addEventListener('DOMContentLoaded', function() {
        const donationForm = document.querySelector('.donation-form');
        if (donationForm) {
          donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amountInput = document.getElementById('amount');
            const amount = parseFloat(amountInput.value);
            
            if (isNaN(amount) || amount < 1) {
              alert('Please enter a valid donation amount (minimum $1).');
              amountInput.focus();
              return;
            }
            
            alert(`Thank you for your donation of $${amount}! You will now be redirected to our secure payment portal.`);
            donationForm.submit();
          });
        }
      });