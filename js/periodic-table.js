/* ========================================
   PERIODIC TABLE INTERACTIVE COMPONENT
   ========================================
   This file handles:
   - Periodic table element data (103 elements)
   - Element property calculations (electron config, period, etc.)
   - Interactive periodic table rendering
   - Search and filter functionality
   - Element detail modal display
   
   FUNCTIONS:
   - initPeriodicTable(): Creates and initializes the periodic table
   - showElementModal(): Displays detailed element information in modal
   - Helper functions: Calculate element properties (electron config, period, etc.)
*/

/* ========================================
   PERIODIC TABLE ELEMENT DATA
   ========================================
   Array containing data for all 103 chemical elements.
   Each object contains:
   - number: Atomic number (protons in nucleus)
   - symbol: Chemical symbol (e.g., H, He, Li)
   - name: Full element name
   - mass: Atomic mass in unified atomic mass units (u)
   - group: Group/column name in periodic table
   - category: Element category for color coding
*/
const periodicTableData = [
    { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, group: 'Nonmetal', category: 'nonmetal' },
    { number: 2, symbol: 'He', name: 'Helium', mass: 4.003, group: 'Noble Gas', category: 'noble-gas' },
    { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.941, group: 'Alkali Metal', category: 'alkali-metal' },
    { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.012, group: 'Alkaline Earth', category: 'alkaline-earth' },
    { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, group: 'Metalloid', category: 'metalloid' },
    { number: 6, symbol: 'C', name: 'Carbon', mass: 12.01, group: 'Nonmetal', category: 'nonmetal' },
    { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.01, group: 'Nonmetal', category: 'nonmetal' },
    { number: 8, symbol: 'O', name: 'Oxygen', mass: 16.00, group: 'Nonmetal', category: 'nonmetal' },
    { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.99, group: 'Nonmetal', category: 'nonmetal' },
    { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.18, group: 'Noble Gas', category: 'noble-gas' },
    { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.99, group: 'Alkali Metal', category: 'alkali-metal' },
    { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.31, group: 'Alkaline Earth', category: 'alkaline-earth' },
    { number: 13, symbol: 'Al', name: 'Aluminum', mass: 26.98, group: 'Post-Transition', category: 'transition-metal' },
    { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.09, group: 'Metalloid', category: 'metalloid' },
    { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.97, group: 'Nonmetal', category: 'nonmetal' },
    { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.07, group: 'Nonmetal', category: 'nonmetal' },
    { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, group: 'Nonmetal', category: 'nonmetal' },
    { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.95, group: 'Noble Gas', category: 'noble-gas' },
    { number: 19, symbol: 'K', name: 'Potassium', mass: 39.10, group: 'Alkali Metal', category: 'alkali-metal' },
    { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.08, group: 'Alkaline Earth', category: 'alkaline-earth' },
    { number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.96, group: 'Transition Metal', category: 'transition-metal' },
    { number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.87, group: 'Transition Metal', category: 'transition-metal' },
    { number: 23, symbol: 'V', name: 'Vanadium', mass: 50.94, group: 'Transition Metal', category: 'transition-metal' },
    { number: 24, symbol: 'Cr', name: 'Chromium', mass: 52.00, group: 'Transition Metal', category: 'transition-metal' },
    { number: 25, symbol: 'Mn', name: 'Manganese', mass: 54.94, group: 'Transition Metal', category: 'transition-metal' },
    { number: 26, symbol: 'Fe', name: 'Iron', mass: 55.85, group: 'Transition Metal', category: 'transition-metal' },
    { number: 27, symbol: 'Co', name: 'Cobalt', mass: 58.93, group: 'Transition Metal', category: 'transition-metal' },
    { number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.69, group: 'Transition Metal', category: 'transition-metal' },
    { number: 29, symbol: 'Cu', name: 'Copper', mass: 63.55, group: 'Transition Metal', category: 'transition-metal' },
    { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, group: 'Transition Metal', category: 'transition-metal' },
    { number: 31, symbol: 'Ga', name: 'Gallium', mass: 69.72, group: 'Post-Transition', category: 'transition-metal' },
    { number: 32, symbol: 'Ge', name: 'Germanium', mass: 72.64, group: 'Metalloid', category: 'metalloid' },
    { number: 33, symbol: 'As', name: 'Arsenic', mass: 74.92, group: 'Metalloid', category: 'metalloid' },
    { number: 34, symbol: 'Se', name: 'Selenium', mass: 78.96, group: 'Nonmetal', category: 'nonmetal' },
    { number: 35, symbol: 'Br', name: 'Bromine', mass: 79.90, group: 'Nonmetal', category: 'nonmetal' },
    { number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.80, group: 'Noble Gas', category: 'noble-gas' },
    { number: 37, symbol: 'Rb', name: 'Rubidium', mass: 85.47, group: 'Alkali Metal', category: 'alkali-metal' },
    { number: 38, symbol: 'Sr', name: 'Strontium', mass: 87.62, group: 'Alkaline Earth', category: 'alkaline-earth' },
    { number: 39, symbol: 'Y', name: 'Yttrium', mass: 88.91, group: 'Transition Metal', category: 'transition-metal' },
    { number: 40, symbol: 'Zr', name: 'Zirconium', mass: 91.22, group: 'Transition Metal', category: 'transition-metal' },
    { number: 41, symbol: 'Nb', name: 'Niobium', mass: 92.91, group: 'Transition Metal', category: 'transition-metal' },
    { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: 95.96, group: 'Transition Metal', category: 'transition-metal' },
    { number: 43, symbol: 'Tc', name: 'Technetium', mass: 98.00, group: 'Transition Metal', category: 'transition-metal' },
    { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: 101.1, group: 'Transition Metal', category: 'transition-metal' },
    { number: 45, symbol: 'Rh', name: 'Rhodium', mass: 102.9, group: 'Transition Metal', category: 'transition-metal' },
    { number: 46, symbol: 'Pd', name: 'Palladium', mass: 106.4, group: 'Transition Metal', category: 'transition-metal' },
    { number: 47, symbol: 'Ag', name: 'Silver', mass: 107.9, group: 'Transition Metal', category: 'transition-metal' },
    { number: 48, symbol: 'Cd', name: 'Cadmium', mass: 112.4, group: 'Transition Metal', category: 'transition-metal' },
    { number: 49, symbol: 'In', name: 'Indium', mass: 114.8, group: 'Post-Transition', category: 'transition-metal' },
    { number: 50, symbol: 'Sn', name: 'Tin', mass: 118.7, group: 'Post-Transition', category: 'transition-metal' },
    { number: 51, symbol: 'Sb', name: 'Antimony', mass: 121.8, group: 'Metalloid', category: 'metalloid' },
    { number: 52, symbol: 'Te', name: 'Tellurium', mass: 127.6, group: 'Metalloid', category: 'metalloid' },
    { number: 53, symbol: 'I', name: 'Iodine', mass: 126.9, group: 'Nonmetal', category: 'nonmetal' },
    { number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.3, group: 'Noble Gas', category: 'noble-gas' },
    { number: 55, symbol: 'Cs', name: 'Cesium', mass: 132.9, group: 'Alkali Metal', category: 'alkali-metal' },
    { number: 56, symbol: 'Ba', name: 'Barium', mass: 137.3, group: 'Alkaline Earth', category: 'alkaline-earth' },
    { number: 57, symbol: 'La', name: 'Lanthanum', mass: 138.9, group: 'Lanthanide', category: 'lanthanide' },
    { number: 58, symbol: 'Ce', name: 'Cerium', mass: 140.1, group: 'Lanthanide', category: 'lanthanide' },
    { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: 140.9, group: 'Lanthanide', category: 'lanthanide' },
    { number: 60, symbol: 'Nd', name: 'Neodymium', mass: 144.2, group: 'Lanthanide', category: 'lanthanide' },
    { number: 61, symbol: 'Pm', name: 'Promethium', mass: 145.0, group: 'Lanthanide', category: 'lanthanide' },
    { number: 62, symbol: 'Sm', name: 'Samarium', mass: 150.4, group: 'Lanthanide', category: 'lanthanide' },
    { number: 63, symbol: 'Eu', name: 'Europium', mass: 152.0, group: 'Lanthanide', category: 'lanthanide' },
    { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: 157.3, group: 'Lanthanide', category: 'lanthanide' },
    { number: 65, symbol: 'Tb', name: 'Terbium', mass: 158.9, group: 'Lanthanide', category: 'lanthanide' },
    { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: 162.5, group: 'Lanthanide', category: 'lanthanide' },
    { number: 67, symbol: 'Ho', name: 'Holmium', mass: 164.9, group: 'Lanthanide', category: 'lanthanide' },
    { number: 68, symbol: 'Er', name: 'Erbium', mass: 167.3, group: 'Lanthanide', category: 'lanthanide' },
    { number: 69, symbol: 'Tm', name: 'Thulium', mass: 168.9, group: 'Lanthanide', category: 'lanthanide' },
    { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: 173.1, group: 'Lanthanide', category: 'lanthanide' },
    { number: 71, symbol: 'Lu', name: 'Lutetium', mass: 175.0, group: 'Lanthanide', category: 'lanthanide' },
    { number: 72, symbol: 'Hf', name: 'Hafnium', mass: 178.5, group: 'Transition Metal', category: 'transition-metal' },
    { number: 73, symbol: 'Ta', name: 'Tantalum', mass: 180.9, group: 'Transition Metal', category: 'transition-metal' },
    { number: 74, symbol: 'W', name: 'Tungsten', mass: 183.8, group: 'Transition Metal', category: 'transition-metal' },
    { number: 75, symbol: 'Re', name: 'Rhenium', mass: 186.2, group: 'Transition Metal', category: 'transition-metal' },
    { number: 76, symbol: 'Os', name: 'Osmium', mass: 190.2, group: 'Transition Metal', category: 'transition-metal' },
    { number: 77, symbol: 'Ir', name: 'Iridium', mass: 192.2, group: 'Transition Metal', category: 'transition-metal' },
    { number: 78, symbol: 'Pt', name: 'Platinum', mass: 195.1, group: 'Transition Metal', category: 'transition-metal' },
    { number: 79, symbol: 'Au', name: 'Gold', mass: 197.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.6, group: 'Transition Metal', category: 'transition-metal' },
    { number: 81, symbol: 'Tl', name: 'Thallium', mass: 204.4, group: 'Post-Transition', category: 'transition-metal' },
    { number: 82, symbol: 'Pb', name: 'Lead', mass: 207.2, group: 'Post-Transition', category: 'transition-metal' },
    { number: 83, symbol: 'Bi', name: 'Bismuth', mass: 208.9, group: 'Post-Transition', category: 'transition-metal' },
    { number: 84, symbol: 'Po', name: 'Polonium', mass: 209.0, group: 'Metalloid', category: 'metalloid' },
    { number: 85, symbol: 'At', name: 'Astatine', mass: 210.0, group: 'Metalloid', category: 'metalloid' },
    { number: 86, symbol: 'Rn', name: 'Radon', mass: 222.0, group: 'Noble Gas', category: 'noble-gas' },
    { number: 87, symbol: 'Fr', name: 'Francium', mass: 223.0, group: 'Alkali Metal', category: 'alkali-metal' },
    { number: 88, symbol: 'Ra', name: 'Radium', mass: 226.0, group: 'Alkaline Earth', category: 'alkaline-earth' },
    { number: 89, symbol: 'Ac', name: 'Actinium', mass: 227.0, group: 'Actinide', category: 'actinide' },
    { number: 90, symbol: 'Th', name: 'Thorium', mass: 232.0, group: 'Actinide', category: 'actinide' },
    { number: 91, symbol: 'Pa', name: 'Protactinium', mass: 231.0, group: 'Actinide', category: 'actinide' },
    { number: 92, symbol: 'U', name: 'Uranium', mass: 238.0, group: 'Actinide', category: 'actinide' },
    { number: 93, symbol: 'Np', name: 'Neptunium', mass: 237.0, group: 'Actinide', category: 'actinide' },
    { number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244.0, group: 'Actinide', category: 'actinide' },
    { number: 95, symbol: 'Am', name: 'Americium', mass: 243.0, group: 'Actinide', category: 'actinide' },
    { number: 96, symbol: 'Cm', name: 'Curium', mass: 247.0, group: 'Actinide', category: 'actinide' },
    { number: 97, symbol: 'Bk', name: 'Berkelium', mass: 247.0, group: 'Actinide', category: 'actinide' },
    { number: 98, symbol: 'Cf', name: 'Californium', mass: 251.0, group: 'Actinide', category: 'actinide' },
    { number: 99, symbol: 'Es', name: 'Einsteinium', mass: 252.0, group: 'Actinide', category: 'actinide' },
    { number: 100, symbol: 'Fm', name: 'Fermium', mass: 257.0, group: 'Actinide', category: 'actinide' },
    { number: 101, symbol: 'Md', name: 'Mendelevium', mass: 258.0, group: 'Actinide', category: 'actinide' },
    { number: 102, symbol: 'No', name: 'Nobelium', mass: 259.0, group: 'Actinide', category: 'actinide' },
    { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: 262.0, group: 'Actinide', category: 'actinide' },
    { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: 267.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 105, symbol: 'Db', name: 'Dubnium', mass: 268.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 106, symbol: 'Sg', name: 'Seaborgium', mass: 269.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 107, symbol: 'Bh', name: 'Bohrium', mass: 270.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 108, symbol: 'Hs', name: 'Hassium', mass: 277.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 109, symbol: 'Mt', name: 'Meitnerium', mass: 278.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: 281.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 111, symbol: 'Rg', name: 'Roentgenium', mass: 282.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 112, symbol: 'Cn', name: 'Copernicium', mass: 285.0, group: 'Transition Metal', category: 'transition-metal' },
    { number: 113, symbol: 'Nh', name: 'Nihonium', mass: 286.0, group: 'Post-Transition', category: 'metalloid' },
    { number: 114, symbol: 'Fl', name: 'Flerovium', mass: 289.0, group: 'Post-Transition', category: 'metalloid' },
    { number: 115, symbol: 'Mc', name: 'Moscovium', mass: 290.0, group: 'Post-Transition', category: 'metalloid' },
    { number: 116, symbol: 'Lv', name: 'Livermorium', mass: 293.0, group: 'Post-Transition', category: 'metalloid' },
    { number: 117, symbol: 'Ts', name: 'Tennessine', mass: 294.0, group: 'Metalloid', category: 'metalloid' },
    { number: 118, symbol: 'Og', name: 'Oganesson', mass: 294.0, group: 'Noble Gas', category: 'noble-gas' }
];

/* ========================================
   ELEMENT PROPERTY HELPER FUNCTIONS
   ========================================
   These functions calculate or retrieve element properties
   based on atomic number. They provide data for the element detail modal.
*/

/* Get Electron Configuration
   Returns electron configuration in noble gas notation
   Example: "[He] 2s² 2p³" for Nitrogen
   - atomicNumber: The element's atomic number (1-103)
   - Returns: String representation of electron configuration
*/
function getElectronConfiguration(atomicNumber) {
    const configs = {
        1: '1s¹', 2: '1s²',
        3: '[He] 2s¹', 4: '[He] 2s²', 5: '[He] 2s² 2p¹', 6: '[He] 2s² 2p²', 7: '[He] 2s² 2p³', 8: '[He] 2s² 2p⁴', 9: '[He] 2s² 2p⁵', 10: '[He] 2s² 2p⁶',
        11: '[Ne] 3s¹', 12: '[Ne] 3s²', 13: '[Ne] 3s² 3p¹', 14: '[Ne] 3s² 3p²', 15: '[Ne] 3s² 3p³', 16: '[Ne] 3s² 3p⁴', 17: '[Ne] 3s² 3p⁵', 18: '[Ne] 3s² 3p⁶',
        19: '[Ar] 4s¹', 20: '[Ar] 4s²', 21: '[Ar] 4s² 3d¹', 22: '[Ar] 4s² 3d²', 23: '[Ar] 4s² 3d³', 24: '[Ar] 4s¹ 3d⁵', 25: '[Ar] 4s² 3d⁵', 26: '[Ar] 4s² 3d⁶',
        27: '[Ar] 4s² 3d⁷', 28: '[Ar] 4s² 3d⁸', 29: '[Ar] 4s¹ 3d¹⁰', 30: '[Ar] 4s² 3d¹⁰', 31: '[Ar] 4s² 3d¹⁰ 4p¹', 32: '[Ar] 4s² 3d¹⁰ 4p²', 33: '[Ar] 4s² 3d¹⁰ 4p³',
        34: '[Ar] 4s² 3d¹⁰ 4p⁴', 35: '[Ar] 4s² 3d¹⁰ 4p⁵', 36: '[Ar] 4s² 3d¹⁰ 4p⁶'
    };
    
    // Simplified calculation for higher numbers
    if (configs[atomicNumber]) {
        return configs[atomicNumber];
    }
    
    // General pattern for most elements
    if (atomicNumber <= 36) {
        return '[Ar] ...';
    }
    if (atomicNumber <= 54) {
        return '[Kr] ...';
    }
    if (atomicNumber <= 86) {
        return '[Xe] ...';
    }
    return '[Rn] ...';
}

/* Get Period Number
   Returns which period (row) the element belongs to in the periodic table
   - Period 1: H, He (2 elements)
   - Period 2-7: Varies by electron shells
   - Returns: Integer (1-7)
*/
function getPeriod(atomicNumber) {
    if (atomicNumber <= 2) return 1;
    if (atomicNumber <= 10) return 2;
    if (atomicNumber <= 18) return 3;
    if (atomicNumber <= 36) return 4;
    if (atomicNumber <= 54) return 5;
    if (atomicNumber <= 86) return 6;
    return 7;
}

/* Get Oxidation States
   Returns common oxidation states (charge when forming ions)
   Example: "+1, -1" means element can gain or lose 1 electron
   - Returns: String of oxidation states or "Variable"
*/
function getOxidationStates(atomicNumber) {
    const commonStates = {
        1: '+1, -1', 2: '+2', 3: '+1', 4: '+2', 5: '+3', 6: '+4, +2, -4', 7: '+5, +3, -3', 8: '-2',
        9: '-1', 11: '+1', 12: '+2', 13: '+3', 14: '+4, +2, -4', 15: '+5, +3, -3', 16: '+6, +4, -2', 17: '+7, +5, +3, +1, -1',
        19: '+1', 20: '+2', 26: '+3, +2', 29: '+2, +1', 30: '+2', 47: '+1', 82: '+2, +4'
    };
    return commonStates[atomicNumber] || 'Variable';
}

/* Get Physical State
   Returns element's physical state at room temperature (25°C)
   - Returns: "Solid", "Liquid", or "Gas"
*/
function getState(atomicNumber) {
    const gases = [1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86];
    const liquids = [35, 80];
    if (gases.includes(atomicNumber)) return 'Gas';
    if (liquids.includes(atomicNumber)) return 'Liquid';
    return 'Solid';
}

/* Get Electronegativity
   Returns electronegativity value on Pauling scale (0-4)
   Measures ability to attract electrons in a bond
   - Higher values = stronger electron attraction
   - Noble gases return null (no electronegativity)
   - Returns: Number (0-4) or null
*/
function getElectronegativity(atomicNumber) {
    const electronegativities = {
        1: 2.20, 2: null, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98, 10: null,
        11: 0.93, 12: 1.31, 13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16, 18: null,
        19: 0.82, 20: 1.00, 26: 1.83, 29: 1.90, 30: 1.65, 35: 2.96, 47: 1.93, 53: 2.66, 79: 2.54, 80: 2.00, 82: 2.33
    };
    return electronegativities[atomicNumber] || null;
}

/* Get Melting Point
   Returns melting point in Celsius
   Temperature at which solid becomes liquid
   - Returns: Number (temperature in °C) or null if not available
*/
function getMeltingPoint(atomicNumber) {
    const meltingPoints = {
        1: -259, 2: -272, 3: 181, 4: 1287, 5: 2076, 6: 3550, 7: -210, 8: -218, 9: -220, 10: -249,
        11: 98, 12: 650, 13: 660, 14: 1414, 15: 44, 16: 113, 17: -101, 18: -189,
        19: 64, 20: 842, 26: 1538, 29: 1085, 30: 420, 35: -7, 47: 962, 53: 114, 79: 1064, 80: -39, 82: 328
    };
    return meltingPoints[atomicNumber] || null;
}

/* Get Boiling Point
   Returns boiling point in Celsius
   Temperature at which liquid becomes gas
   - Returns: Number (temperature in °C) or null if not available
*/
function getBoilingPoint(atomicNumber) {
    const boilingPoints = {
        1: -253, 2: -269, 3: 1342, 4: 2470, 5: 3927, 6: 4027, 7: -196, 8: -183, 9: -188, 10: -246,
        11: 883, 12: 1090, 13: 2467, 14: 2900, 15: 280, 16: 445, 17: -35, 18: -186,
        19: 759, 20: 1484, 26: 2861, 29: 2562, 30: 907, 35: 59, 47: 2212, 53: 184, 79: 2856, 80: 357, 82: 1749
    };
    return boilingPoints[atomicNumber] || null;
}

/* Get Density
   Returns density in grams per cubic centimeter
   Mass per unit volume of the element
   - Returns: Number (density in g/cm³) or null if not available
*/
function getDensity(atomicNumber) {
    const densities = {
        1: 0.00009, 2: 0.00018, 3: 0.534, 4: 1.85, 5: 2.34, 6: 2.26, 7: 0.00125, 8: 0.00143, 9: 0.0017, 10: 0.0009,
        11: 0.97, 12: 1.74, 13: 2.70, 14: 2.33, 15: 1.82, 16: 2.07, 17: 0.00321, 18: 0.00178,
        19: 0.86, 20: 1.54, 26: 7.87, 29: 8.96, 30: 7.14, 35: 3.12, 47: 10.5, 53: 4.93, 79: 19.3, 80: 13.55, 82: 11.34
    };
    return densities[atomicNumber] || null;
}

/* Get Discovery Year
   Returns year element was discovered
   Some ancient elements return "Ancient"
   - Returns: Number (year) or String ("Ancient") or null
*/
function getDiscoveryYear(atomicNumber) {
    const discoveryYears = {
        1: 1766, 2: 1895, 3: 1817, 4: 1798, 5: 1808, 6: 'Ancient', 7: 1772, 8: 1774, 9: 1886, 10: 1898,
        11: 1807, 12: 1755, 13: 1825, 14: 1823, 15: 1669, 16: 'Ancient', 17: 1774, 18: 1894,
        19: 1807, 20: 1808, 26: 'Ancient', 29: 'Ancient', 30: 1746, 35: 1826, 47: 'Ancient', 53: 1811, 79: 'Ancient', 80: 'Ancient', 82: 'Ancient'
    };
    return discoveryYears[atomicNumber] || null;
}

/* Get Electron Shells
   Returns electron distribution across shells
   Shows how electrons are distributed in energy levels
   Example: "2, 8, 1" means 2 in first shell, 8 in second, 1 in third
   - Returns: String (comma-separated numbers) or "Variable"
*/
function getElectronShells(atomicNumber) {
    const shells = {
        1: '1', 2: '2', 3: '2, 1', 4: '2, 2', 5: '2, 3', 6: '2, 4', 7: '2, 5', 8: '2, 6', 9: '2, 7', 10: '2, 8',
        11: '2, 8, 1', 12: '2, 8, 2', 13: '2, 8, 3', 14: '2, 8, 4', 15: '2, 8, 5', 16: '2, 8, 6', 17: '2, 8, 7', 18: '2, 8, 8',
        19: '2, 8, 8, 1', 20: '2, 8, 8, 2'
    };
    return shells[atomicNumber] || 'Variable';
}

/* Get Element Description
   Returns educational description about the element
   Provides context about importance, uses, and properties
   - atomicNumber: Element's atomic number
   - name: Full element name
   - symbol: Chemical symbol
   - Returns: String description
*/
function getElementDescription(atomicNumber, name, symbol) {
    const descriptions = {
        1: 'The lightest and most abundant element in the universe. Essential for life and forms water (H₂O).',
        2: 'Inert noble gas, used in balloons and cryogenics. Second lightest element.',
        6: 'The basis of all life on Earth. Forms millions of compounds. Diamond and graphite are pure carbon.',
        7: 'Makes up 78% of Earth\'s atmosphere. Essential for proteins and DNA.',
        8: 'Most abundant element in Earth\'s crust. Essential for respiration. Forms water (H₂O).',
        11: 'Highly reactive alkali metal. Common in salt (NaCl). Soft, silvery metal.',
        13: 'Lightweight, corrosion-resistant metal. Most abundant metal in Earth\'s crust.',
        17: 'Greenish-yellow toxic gas. Used in water treatment and many chemicals.',
        26: 'Most common metal on Earth. Core component of steel. Essential for hemoglobin.',
        29: 'Excellent conductor of electricity. Used in wiring and electronics.',
        47: 'Best electrical conductor. Used in jewelry, electronics, and photography.',
        79: 'Precious metal, resistant to corrosion. Used in jewelry and electronics.',
        80: 'Only metal liquid at room temperature. Toxic. Used in thermometers.'
    };
    return descriptions[atomicNumber] || `${name} (${symbol}) is an important chemical element with atomic number ${atomicNumber}.`;
}

/* ========================================
   SHOW ELEMENT DETAIL MODAL
   ========================================
   Creates and displays a modal dialog with comprehensive element information.
   - Creates modal structure if it doesn't exist
   - Populates modal with element data
   - Handles modal close events
   - Shows animations and styling
   
   Parameters:
   - element: Object containing element data (number, symbol, name, mass, group, category)
*/
function showElementModal(element) {
    // Create modal element if it doesn't already exist on the page
    let modal = document.getElementById('element-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'element-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-body" id="modal-body">
                    <!-- Content will be inserted here -->
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal function - Reusable function to close modal and restore scroll
        const closeModal = () => {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');  // Restore body scroll
        };
        
        // Close button - positioned in top right of modal body
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
    
    // ========================================
    // CALCULATE ELEMENT PROPERTIES
    // ========================================
    // Retrieve all element properties using helper functions
    
    const period = getPeriod(element.number);                    // Period (row) number
    const electronConfig = getElectronConfiguration(element.number);  // Electron configuration
    const oxidationStates = getOxidationStates(element.number);   // Common oxidation states
    const state = getState(element.number);                       // Physical state at 25°C
    const electronegativity = getElectronegativity(element.number);  // Electronegativity value
    const meltingPoint = getMeltingPoint(element.number);         // Melting point in °C
    const boilingPoint = getBoilingPoint(element.number);         // Boiling point in °C
    const density = getDensity(element.number);                   // Density in g/cm³
    const discoveryYear = getDiscoveryYear(element.number);       // Discovery year
    const electronShells = getElectronShells(element.number);     // Electron shell distribution
    const description = getElementDescription(element.number, element.name, element.symbol);  // Element description
    
    // ========================================
    // BUILD MODAL HTML CONTENT
    // ========================================
    // Create HTML structure with all element details
    
    document.getElementById('modal-body').innerHTML = `
        <div class="element-detail-header">
            <div class="element-large-symbol">${element.symbol}</div>
            <h3 class="element-name-title">${element.name}</h3>
            <p class="element-atomic-number">Atomic Number ${element.number}</p>
        </div>
        
        <div class="element-detail-info">
            <div class="detail-item">
                <strong>Atomic Symbol</strong>
                <span>${element.symbol}</span>
            </div>
            <div class="detail-item">
                <strong>Atomic Number</strong>
                <span>${element.number}</span>
            </div>
            <div class="detail-item">
                <strong>Atomic Mass</strong>
                <span>${element.mass} u</span>
            </div>
            <div class="detail-item">
                <strong>Group</strong>
                <span>${element.group}</span>
            </div>
            <div class="detail-item">
                <strong>Period</strong>
                <span>${period}</span>
            </div>
            <div class="detail-item">
                <strong>State (25°C)</strong>
                <span>${state}</span>
            </div>
            ${density ? `
            <div class="detail-item">
                <strong>Density</strong>
                <span>${density} g/cm³</span>
            </div>
            ` : ''}
            ${meltingPoint !== null ? `
            <div class="detail-item">
                <strong>Melting Point</strong>
                <span>${meltingPoint}°C</span>
            </div>
            ` : ''}
            ${boilingPoint !== null ? `
            <div class="detail-item">
                <strong>Boiling Point</strong>
                <span>${boilingPoint}°C</span>
            </div>
            ` : ''}
        </div>
        
        <div class="element-properties-grid">
            <div class="property-group">
                <h4>Electronic Properties</h4>
                <ul>
                    <li><strong>Electron Configuration:</strong><br><span class="property-value">${electronConfig}</span></li>
                    <li><strong>Electron Shells:</strong><br><span class="property-value">${electronShells}</span></li>
                    <li><strong>Electronegativity:</strong><br><span class="property-value">${electronegativity !== null ? electronegativity : 'N/A (noble gas)'}</span></li>
                    <li><strong>Oxidation States:</strong><br><span class="property-value">${oxidationStates}</span></li>
                </ul>
            </div>
            <div class="property-group">
                <h4>Classification</h4>
                <ul>
                    <li><strong>Category:</strong><br><span class="property-value">${element.category.charAt(0).toUpperCase() + element.category.slice(1).replace('-', ' ')}</span></li>
                    <li><strong>Group Name:</strong><br><span class="property-value">${element.group}</span></li>
                    <li><strong>Period:</strong><br><span class="property-value">${period}</span></li>
                    <li><strong>Physical State:</strong><br><span class="property-value">${state}</span></li>
                </ul>
            </div>
            ${discoveryYear ? `
            <div class="property-group">
                <h4>Discovery</h4>
                <ul>
                    <li><strong>Year:</strong><br><span class="property-value">${discoveryYear}</span></li>
                </ul>
            </div>
            ` : ''}
        </div>
        
        <div class="element-description">
            <h4>About ${element.name}</h4>
            <p>${description}</p>
        </div>
    `;
    
    // ========================================
    // DISPLAY MODAL
    // ========================================
    // Add 'show' class to make modal visible with animations
    modal.classList.add('show');
    
    // Prevent body scroll when modal is open
    document.body.classList.add('modal-open');
}

/* ========================================
   INITIALIZE PERIODIC TABLE
   ========================================
   Main function that sets up the interactive periodic table.
   - Creates element boxes in grid layout
   - Adds hover tooltips
   - Implements search functionality
   - Adds filter buttons
   - Sets up click handlers for modal
*/
function initPeriodicTable() {
    // ========================================
    // GET DOM ELEMENTS
    // ========================================
    // Find necessary elements in the HTML
    
    const container = document.querySelector('.periodic-table');          // Main table container
    const lanthanoidsContainer = document.querySelector('.periodic-table-lanthanoids');  // Lanthanoids row
    const actinoidsContainer = document.querySelector('.periodic-table-actinoids');      // Actinoids row
    const searchBox = document.querySelector('.search-box');               // Search input field
    const filterButtons = document.querySelectorAll('.filter-btn');       // Filter category buttons
    
    // Create tooltip element for hover information
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);  // Add to page
    
    // Exit if periodic table container doesn't exist
    if (!container) return;
    
    // ========================================
    // CREATE PERIODIC TABLE GRID
    // ========================================
    // Clear any existing content
    container.innerHTML = '';
    if (lanthanoidsContainer) lanthanoidsContainer.innerHTML = '';
    if (actinoidsContainer) actinoidsContainer.innerHTML = '';
    
    // ========================================
    // SEPARATE ELEMENTS BY CATEGORY
    // ========================================
    // Main table elements (1-56, 72-88, 104-118) - excluding lanthanoids and actinoids
    const mainTableElements = periodicTableData.filter(el => 
        (el.number >= 1 && el.number <= 56) || 
        (el.number >= 72 && el.number <= 88) ||
        (el.number >= 104 && el.number <= 118)
    );
    
    // Lanthanoids (57-71)
    const lanthanoids = periodicTableData.filter(el => 
        el.number >= 57 && el.number <= 71
    );
    
    // Actinoids (89-103)
    const actinoids = periodicTableData.filter(el => 
        el.number >= 89 && el.number <= 103
    );
    
    // ========================================
    // CREATE MAIN TABLE WITH PROPER POSITIONING
    // ========================================
    // Create 18 columns × 7 rows = 126 slots
    // Elements 1-2: Row 1 (columns 1-18)
    // Elements 3-10: Row 2 (columns 1-18)
    // Elements 11-18: Row 3 (columns 1-18)
    // Elements 19-36: Row 4 (columns 1-18)
    // Elements 37-54: Row 5 (columns 1-18)
    // Elements 55-56, then space for La: Row 6 (columns 1-2, empty, then columns 3-18)
    // Elements 72-88: Row 7 (columns 3-18, starting after La space)
    
    // Create element map for quick lookup
    const elementMap = new Map();
    mainTableElements.forEach(el => elementMap.set(el.number, el));
    
    // Standard periodic table positions (row, column)
    const positions = {
        1: [1, 1], 2: [1, 18],  // Period 1: H, He
        // Period 2: Li-Ne (columns 1-10), then gap, then F, Ne (columns 17-18)
        3: [2, 1], 4: [2, 2], 5: [2, 13], 6: [2, 14], 7: [2, 15], 8: [2, 16], 9: [2, 17], 10: [2, 18],
        // Period 3: Na-Ar (columns 1-18)
        11: [3, 1], 12: [3, 2], 13: [3, 13], 14: [3, 14], 15: [3, 15], 16: [3, 16], 17: [3, 17], 18: [3, 18],
        // Period 4: K-Kr (columns 1-18)
        19: [4, 1], 20: [4, 2], 21: [4, 3], 22: [4, 4], 23: [4, 5], 24: [4, 6], 25: [4, 7], 26: [4, 8],
        27: [4, 9], 28: [4, 10], 29: [4, 11], 30: [4, 12], 31: [4, 13], 32: [4, 14], 33: [4, 15], 34: [4, 16],
        35: [4, 17], 36: [4, 18],
        // Period 5: Rb-Xe (columns 1-18)
        37: [5, 1], 38: [5, 2], 39: [5, 3], 40: [5, 4], 41: [5, 5], 42: [5, 6], 43: [5, 7], 44: [5, 8],
        45: [5, 9], 46: [5, 10], 47: [5, 11], 48: [5, 12], 49: [5, 13], 50: [5, 14], 51: [5, 15], 52: [5, 16],
        53: [5, 17], 54: [5, 18],
        // Period 6: Cs-Ba, then La (with *), then Hf-Rn
        55: [6, 1], 56: [6, 2], 57: [6, 3], // La with asterisk indicator
        72: [6, 4], 73: [6, 5], 74: [6, 6], 75: [6, 7], 76: [6, 8], 77: [6, 9], 78: [6, 10], 79: [6, 11],
        80: [6, 12], 81: [6, 13], 82: [6, 14], 83: [6, 15], 84: [6, 16], 85: [6, 17], 86: [6, 18],
        // Period 7: Fr-Ra, then Ac (with *), then Rf-Og (104-118)
        87: [7, 1], 88: [7, 2], 89: [7, 3], // Ac with asterisk indicator
        // Superheavy elements (104-118) - Period 7, columns 4-18
        104: [7, 4], 105: [7, 5], 106: [7, 6], 107: [7, 7], 108: [7, 8],
        109: [7, 9], 110: [7, 10], 111: [7, 11], 112: [7, 12], 113: [7, 13],
        114: [7, 14], 115: [7, 15], 116: [7, 16], 117: [7, 17], 118: [7, 18]
    };
    
    // Create empty grid (18 columns × 7 rows = 126 cells)
    for (let row = 1; row <= 7; row++) {
        for (let col = 1; col <= 18; col++) {
            const cell = document.createElement('div');
            cell.className = 'element-placeholder';
            cell.dataset.row = row;
            cell.dataset.col = col;
            container.appendChild(cell);
        }
    }
    
    // Place main table elements
    mainTableElements.forEach(element => {
        const pos = positions[element.number];
        if (pos) {
            const [row, col] = pos;
            const index = (row - 1) * 18 + (col - 1); // Calculate grid index
            const placeholder = container.children[index];
            if (placeholder) {
                const el = createElementBox(element, tooltip);
                container.replaceChild(el, placeholder);
            }
        }
    });
    
    // ========================================
    // CREATE LANTHANOIDS ROW
    // ========================================
    if (lanthanoidsContainer && lanthanoids.length > 0) {
        lanthanoids.forEach(element => {
            const el = createElementBox(element, tooltip);
            lanthanoidsContainer.appendChild(el);
        });
    }
    
    // ========================================
    // CREATE ACTINOIDS ROW
    // ========================================
    if (actinoidsContainer && actinoids.length > 0) {
        actinoids.forEach(element => {
            const el = createElementBox(element, tooltip);
            actinoidsContainer.appendChild(el);
        });
    }
    
    // ========================================
    // SEARCH FUNCTIONALITY (includes all containers)
    // ========================================
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const allContainers = [container, lanthanoidsContainer, actinoidsContainer].filter(c => c);
            
            allContainers.forEach(container => {
                const elements = container.querySelectorAll('.element');
                elements.forEach(el => {
                    const matches = 
                        el.dataset.symbol.includes(query) ||
                        el.dataset.name.includes(query) ||
                        el.dataset.number.includes(query);
                    el.classList.toggle('hidden', !matches && query !== '');
                });
            });
        });
    }
    
    // ========================================
    // FILTER BUTTON FUNCTIONALITY (includes all containers)
    // ========================================
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const allContainers = [container, lanthanoidsContainer, actinoidsContainer].filter(c => c);
            
            allContainers.forEach(container => {
                const elements = container.querySelectorAll('.element');
                elements.forEach(el => {
                    if (category === 'all') {
                        el.classList.remove('hidden');
                    } else {
                        el.classList.toggle('hidden', el.dataset.category !== category);
                    }
                });
            });
        });
    });
}

/* ========================================
   CREATE ELEMENT BOX
   ========================================
   Helper function to create an element box with all event handlers.
   Reusable for main table, lanthanoids, and actinoids.
*/
function createElementBox(element, tooltip) {
    const el = document.createElement('div');
    el.className = `element ${element.category}`;
    el.dataset.number = element.number;
    el.dataset.symbol = element.symbol.toLowerCase();
    el.dataset.name = element.name.toLowerCase();
    el.dataset.category = element.category;
    
    // Add asterisk for La (57) and Ac (89) indicating separate rows below
    const symbolText = (element.number === 57 || element.number === 89) 
        ? `${element.symbol}*` 
        : element.symbol;
    
    // ========================================
    // ELEMENT BOX CONTENT
    // ========================================
    // Set HTML content: atomic number, symbol, and name
    el.innerHTML = `
        <div class="element-number">${element.number}</div>
        <div class="element-symbol">${symbolText}</div>
        <div class="element-name">${element.name}</div>
    `;
    
    // ========================================
    // HOVER TOOLTIP
    // ========================================
    // Show quick information when mouse hovers over element
    el.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        tooltip.innerHTML = `
            <strong>${element.name}</strong><br>
            Symbol: ${element.symbol}<br>
            Atomic Number: ${element.number}<br>
            Atomic Mass: ${element.mass} u<br>
            Group: ${element.group}
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
        tooltip.classList.add('show');
    });
    
    // Hide tooltip when mouse leaves element
    el.addEventListener('mouseleave', function() {
        tooltip.classList.remove('show');
        tooltip.style.display = 'none';
    });
    
    // ========================================
    // CLICK HANDLER - SHOW DETAIL MODAL
    // ========================================
    // When element is clicked, show detailed information modal
    el.addEventListener('click', function() {
        showElementModal(element);  // Pass element data to modal function
    });
    
    return el;  // Return the created element
}

/* ========================================
   AUTO-INITIALIZE PERIODIC TABLE
   ========================================
   Automatically runs when page loads.
   Checks if DOM is already loaded or waits for it.
*/
if (document.readyState === 'loading') {
    // DOM still loading, wait for it
    document.addEventListener('DOMContentLoaded', initPeriodicTable);
} else {
    // DOM already loaded, run immediately
    initPeriodicTable();
}


