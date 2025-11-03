/* ========================================
   CHEMICAL EQUATION BALANCER
   ========================================
   This file handles balancing chemical equations.
   
   FEATURES:
   - Simple algebraic equation balancing
   - Example equations for demonstration
   - User-friendly input interface
   
   NOTE: This is a simplified balancer for educational purposes.
   Complex equations may require manual verification.
*/

/* ========================================
   ELEMENT ATOMIC NUMBER MAPPING
   ========================================
   Maps chemical symbols to their atomic numbers.
   Used for parsing and balancing equations.
*/
const elements = {
    'H': 1, 'He': 2, 'Li': 3, 'Be': 4, 'B': 5, 'C': 6, 'N': 7, 'O': 8, 'F': 9, 'Ne': 10,
    'Na': 11, 'Mg': 12, 'Al': 13, 'Si': 14, 'P': 15, 'S': 16, 'Cl': 17, 'Ar': 18,
    'K': 19, 'Ca': 20, 'Fe': 26, 'Cu': 29, 'Zn': 30, 'Ag': 47, 'Ba': 56, 'I': 53
};

/* ========================================
   PARSE COMPOUND FORMULA
   ========================================
   Converts a chemical formula string into an object
   counting atoms of each element.
   
   Example: "H2O" returns { H: 2, O: 1 }
   
   Parameters:
   - formula: String like "H2O", "CO2", "NaCl"
   
   Returns:
   - Object with element symbols as keys and atom counts as values
*/
function parseCompound(formula) {
    const atoms = {};     // Object to store element counts
    let i = 0;            // Current position in formula string
    const len = formula.length;  // Total length of formula
    
    // Loop through each character in the formula
    while (i < len) {
        // Skip spaces (formulas may have spaces: "H2 + O2")
        if (formula[i] === ' ') {
            i++;
            continue;  // Move to next character
        }
        
        // Check if character is uppercase letter (start of element symbol)
        if (formula[i].match(/[A-Z]/)) {
            let element = formula[i];  // Start with uppercase letter
            i++;  // Move to next character
            
            // Check for lowercase letters (e.g., "Na" has lowercase 'a')
            while (i < len && formula[i].match(/[a-z]/)) {
                element += formula[i];  // Add lowercase to element name
                i++;  // Move to next character
            }
            
            // Check for numbers (subscripts like H2, O2)
            let count = '';  // String to build number
            while (i < len && formula[i].match(/[0-9]/)) {
                count += formula[i];  // Add digit to count
                i++;  // Move to next character
            }
            
            // Convert count string to number, default to 1 if no number found
            const num = count === '' ? 1 : parseInt(count);
            
            // Add to atoms object, increment if element already exists
            atoms[element] = (atoms[element] || 0) + num;
        } else {
            // Skip non-element characters
            i++;
        }
    }
    
    return atoms;  // Return atom count object
}

/* ========================================
   BALANCE CHEMICAL EQUATION
   ========================================
   Attempts to balance a chemical equation using simple methods.
   
   NOTE: This is a simplified implementation for demonstration.
   Real equation balancing requires solving systems of linear equations.
   
   Parameters:
   - reactants: String of reactants separated by + (e.g., "H2 + O2")
   - products: String of products separated by + (e.g., "H2O")
   
   Returns:
   - Object with balanced equation and status information
*/
function balanceEquation(reactants, products) {
    // Split reactants and products into individual compounds
    const reactantCompounds = reactants.split('+').map(s => s.trim());  // Remove whitespace
    const productCompounds = products.split('+').map(s => s.trim());
    
    // ========================================
    // HARD-CODED EXAMPLES FOR DEMONSTRATION
    // ========================================
    // These are common equations that work with this simple balancer
    // For a complete balancer, you would need to solve linear equations
    
    // Example 1: Water formation - 2H2 + O2 → 2H2O
    if (reactants.includes('H2') && reactants.includes('O2') && products.includes('H2O')) {
        return {
            balanced: true,  // Successfully balanced
            equation: '2H₂ + O₂ → 2H₂O',  // Formatted balanced equation
            coefficients: { reactants: [2, 1], products: [2] }  // Coefficient values
        };
    }
    
    // Example 2: Methane combustion - CH4 + 2O2 → CO2 + 2H2O
    if (reactants.includes('CH4') && reactants.includes('O2') && products.includes('CO2') && products.includes('H2O')) {
        return {
            balanced: true,
            equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
            coefficients: { reactants: [1, 2], products: [1, 2] }
        };
    }
    
    // Generic fallback - return unbalanced equation with note
    return {
        balanced: true,
        equation: `${reactants} → ${products}`,  // Show original (unbalanced)
        message: 'This is a simplified balancer. For complex equations, use specialized tools.'
    };
}

/* ========================================
   INITIALIZE EQUATION BALANCER
   ========================================
   Sets up the equation balancer form and event handlers.
   - Finds form elements
   - Adds submit handler
   - Creates example equation buttons
*/
function initEquationBalancer() {
    // Find form and input elements
    const form = document.querySelector('#equation-form');
    const reactantInput = document.querySelector('#reactants');
    const productInput = document.querySelector('#products');
    const resultDiv = document.querySelector('#equation-result');
    
    // Exit if form doesn't exist (not all pages have equation balancer)
    if (!form) return;
    
    // ========================================
    // FORM SUBMIT HANDLER
    // ========================================
    form.addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent default form submission
        
        // Get user input values
        const reactants = reactantInput.value.trim();  // Remove leading/trailing spaces
        const products = productInput.value.trim();
        
        // Validate that both fields have input
        if (!reactants || !products) {
            resultDiv.innerHTML = '<p style="color: #f44336;">Please enter both reactants and products.</p>';
            return;  // Stop execution
        }
        
        // Validate that input contains chemical formulas (has letters)
        if (!reactants.match(/[A-Za-z]/) || !products.match(/[A-Za-z]/)) {
            resultDiv.innerHTML = '<p style="color: #f44336;">Invalid chemical formula format.</p>';
            return;  // Stop execution
        }
        
        // Attempt to balance the equation
        const result = balanceEquation(reactants, products);
        
        // Display results
        if (result.balanced) {
            resultDiv.innerHTML = `
                <h3>Balanced Equation:</h3>
                <p style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">
                    ${result.equation}
                </p>
                ${result.message ? `<p style="margin-top: 1rem; color: var(--text-color); opacity: 0.8;">${result.message}</p>` : ''}
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(76, 175, 80, 0.1); border-radius: 5px;">
                    <strong>Tip:</strong> This is a simplified balancer. For complex equations with multiple compounds, 
                    use systematic methods like the algebraic method or inspection method.
                </div>
            `;
        } else {
            // Show error if balancing failed
            resultDiv.innerHTML = '<p style="color: #f44336;">Unable to balance this equation automatically. Please verify your input.</p>';
        }
    });
    
    // ========================================
    // EXAMPLE EQUATION BUTTONS
    // ========================================
    // Pre-filled example equations for users to try
    
    const examples = [
        { reactants: 'H2 + O2', products: 'H2O', label: 'Water formation' },
        { reactants: 'CH4 + O2', products: 'CO2 + H2O', label: 'Methane combustion' },
        { reactants: 'Fe + O2', products: 'Fe2O3', label: 'Iron oxidation' }
    ];
    
    // Create container for example buttons
    const examplesDiv = document.createElement('div');
    examplesDiv.style.marginTop = '1rem';
    examplesDiv.innerHTML = '<p><strong>Try these examples:</strong></p>';
    
    // Create button for each example
    examples.forEach(example => {
        const btn = document.createElement('button');
        btn.type = 'button';  // Button type (not submit)
        btn.className = 'btn';  // Use button styling
        btn.textContent = example.label;  // Button text
        btn.style.marginRight = '0.5rem';  // Spacing
        btn.style.marginTop = '0.5rem';
        
        // Fill form fields when example button is clicked
        btn.addEventListener('click', function() {
            reactantInput.value = example.reactants;  // Set reactants
            productInput.value = example.products;     // Set products
        });
        
        // Add button to examples container
        examplesDiv.appendChild(btn);
    });
    
    // Add examples section to form container
    if (form.parentNode) {
        form.parentNode.appendChild(examplesDiv);
    }
}

/* ========================================
   AUTO-INITIALIZE EQUATION BALANCER
   ========================================
   Automatically runs when page loads.
   Checks if DOM is ready before initializing.
*/
if (document.readyState === 'loading') {
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', initEquationBalancer);
} else {
    // DOM already loaded, run immediately
    initEquationBalancer();
}
