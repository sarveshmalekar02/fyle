document.getElementById('taxCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

   
    var formInputs = document.querySelectorAll('#taxCalculatorForm input, #taxCalculatorForm select');
    var error = Array.from(formInputs).some(function(input) {
        if (!input.value) {
            input.nextElementSibling.style.display = 'inline-block';
            return true; 
        } else {
            input.nextElementSibling.style.display = 'none';
            return false;
        }
    });

    if (error) return; 

   
    var income = parseFloat(document.getElementById('income').value) || 0;
    var extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    var deductions = parseFloat(document.getElementById('deductions').value) || 0;
    var age = document.getElementById('age').value;

    
    var totalIncome = income + extraIncome - deductions;

    
    var tax = 0;
    if (totalIncome > 800000) {
        switch (age) {
            case '<40':
                tax = (totalIncome - 800000) * 0.3;
                break;
            case '>=40&<60':
                tax = (totalIncome - 800000) * 0.4;
                break;
            case '>=60':
                tax = (totalIncome - 800000) * 0.1;
                break;
            default:
                break;
        }
    }

    
    document.getElementById('taxResult').textContent = tax.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    var modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();
});
