/* ========================================
   QUIZ SYSTEM FOR CHEMISTRY WEBSITE
   ========================================
   Interactive quiz system with multiple-choice questions.
   
   FEATURES:
   - Multiple quiz sizes: 5, 10, 20, 30, 40 questions
   - Hints for each question (show before submission)
   - Answer review after submission
   - Shows wrong answers with correct answers
   - Score calculation and percentage
   
   STRUCTURE:
   - quizzes object: Contains all quiz questions by size and topic
   - initQuiz(): Sets up a quiz for a specific topic/size
   - displayQuestion(): Shows current question with hint button
   - showHint(): Displays hint for current question
   - showResults(): Displays final score and detailed review
*/

/* ========================================
   QUIZ QUESTIONS DATABASE
   ========================================
   Organized by quiz size (5, 10, 20, 30, 40 questions).
   Each question contains:
   - question: The question text
   - options: Array of 4 possible answers
   - correct: Index (0-3) of the correct answer
   - hint: Helpful hint for the question
   - explanation: Explanation shown in results (optional)
*/

const quizzes = {
    // 5 Questions Quiz - Quick quiz
    quiz5: [
        {
            question: "What is the atomic number of Carbon?",
            options: ["5", "6", "12", "14"],
            correct: 1,
            hint: "Think about how many protons carbon has in its nucleus. The atomic number equals the number of protons.",
            explanation: "Carbon has 6 protons, so its atomic number is 6."
        },
        {
            question: "Which of the following is a noble gas?",
            options: ["Hydrogen", "Oxygen", "Neon", "Carbon"],
            correct: 2,
            hint: "Noble gases are in Group 18 of the periodic table and have full outer electron shells.",
            explanation: "Neon (Ne) is a noble gas in Group 18. It has a full outer electron shell, making it very stable and unreactive."
        },
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "H2O2", "CO2", "NaCl"],
            correct: 0,
            hint: "Water consists of two hydrogen atoms bonded to one oxygen atom.",
            explanation: "H₂O is the chemical formula for water - two hydrogen atoms covalently bonded to one oxygen atom."
        },
        {
            question: "In a balanced chemical equation, what must be equal on both sides?",
            options: ["Number of molecules", "Number of atoms of each element", "Total mass", "Both B and C"],
            correct: 3,
            hint: "The law of conservation of mass states that matter cannot be created or destroyed in a chemical reaction.",
            explanation: "Both the number of atoms of each element and the total mass must be equal on both sides of a balanced equation, following the law of conservation of mass."
        },
        {
            question: "What type of bond is formed when electrons are shared?",
            options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
            correct: 1,
            hint: "When atoms share electrons to achieve a stable electron configuration, this type of bond is formed.",
            explanation: "A covalent bond is formed when two atoms share one or more pairs of electrons between them."
        }
    ],
    
    // 10 Questions Quiz - Standard quiz
    quiz10: [
        {
            question: "What is the atomic number of Carbon?",
            options: ["5", "6", "12", "14"],
            correct: 1,
            hint: "Think about how many protons carbon has in its nucleus.",
            explanation: "Carbon has 6 protons, so its atomic number is 6."
        },
        {
            question: "Which of the following is a noble gas?",
            options: ["Hydrogen", "Oxygen", "Neon", "Carbon"],
            correct: 2,
            hint: "Noble gases are in Group 18 and have full outer electron shells.",
            explanation: "Neon is a noble gas in Group 18 with a full outer electron shell."
        },
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "H2O2", "CO2", "NaCl"],
            correct: 0,
            hint: "Water consists of two hydrogen atoms and one oxygen atom.",
            explanation: "H₂O represents two hydrogen atoms bonded to one oxygen atom."
        },
        {
            question: "What is the pH of a neutral solution?",
            options: ["0", "7", "14", "10"],
            correct: 1,
            hint: "pH 7 is the middle point of the pH scale, indicating neither acidic nor basic.",
            explanation: "pH 7 is neutral. Values below 7 are acidic, values above 7 are basic."
        },
        {
            question: "Which element has the symbol 'Na'?",
            options: ["Nitrogen", "Sodium", "Nickel", "Neon"],
            correct: 1,
            hint: "This element is a soft, silvery-white metal that reacts vigorously with water.",
            explanation: "Na is the symbol for Sodium, from the Latin word 'natrium'."
        },
        {
            question: "What is Avogadro's number?",
            options: ["6.022 × 10²³", "6.022 × 10²²", "3.141 × 10²³", "2.718 × 10²³"],
            correct: 0,
            hint: "This number represents the number of particles in one mole of a substance.",
            explanation: "Avogadro's number is 6.022 × 10²³, representing the number of atoms, molecules, or particles in one mole."
        },
        {
            question: "What is the molecular formula for methane?",
            options: ["CH4", "C2H6", "C3H8", "CH3OH"],
            correct: 0,
            hint: "Methane is the simplest hydrocarbon, consisting of one carbon and four hydrogen atoms.",
            explanation: "CH₄ is methane, the simplest alkane with one carbon atom bonded to four hydrogen atoms."
        },
        {
            question: "Which process involves the breaking down of larger molecules into smaller ones?",
            options: ["Condensation", "Polymerization", "Hydrolysis", "Oxidation"],
            correct: 2,
            hint: "This reaction involves the addition of water to break chemical bonds.",
            explanation: "Hydrolysis is a chemical reaction where water is used to break down larger molecules into smaller ones."
        },
        {
            question: "What is the charge of a proton?",
            options: ["Neutral", "+1", "-1", "+2"],
            correct: 1,
            hint: "Protons are positively charged particles found in the atomic nucleus.",
            explanation: "Protons have a positive charge of +1, while electrons have a charge of -1."
        },
        {
            question: "Which type of reaction releases energy?",
            options: ["Endothermic", "Exothermic", "Endergonic", "Isothermic"],
            correct: 1,
            hint: "This type of reaction releases heat and has a negative enthalpy change.",
            explanation: "Exothermic reactions release energy (usually as heat), while endothermic reactions absorb energy."
        }
    ],
    
    // 20 Questions Quiz - Extended quiz
    quiz20: [
        {
            question: "What is the atomic number of Carbon?",
            options: ["5", "6", "12", "14"],
            correct: 1,
            hint: "Think about how many protons carbon has.",
            explanation: "Carbon has 6 protons, atomic number 6."
        },
        {
            question: "Which of the following is a noble gas?",
            options: ["Hydrogen", "Oxygen", "Neon", "Carbon"],
            correct: 2,
            hint: "Noble gases are in Group 18.",
            explanation: "Neon is a noble gas in Group 18."
        },
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "H2O2", "CO2", "NaCl"],
            correct: 0,
            hint: "Two hydrogens, one oxygen.",
            explanation: "H₂O is water."
        },
        {
            question: "What is the pH of a neutral solution?",
            options: ["0", "7", "14", "10"],
            correct: 1,
            hint: "The middle of the pH scale.",
            explanation: "pH 7 is neutral."
        },
        {
            question: "Which element has the symbol 'Na'?",
            options: ["Nitrogen", "Sodium", "Nickel", "Neon"],
            correct: 1,
            hint: "A soft, reactive metal.",
            explanation: "Na is Sodium."
        },
        {
            question: "What is Avogadro's number?",
            options: ["6.022 × 10²³", "6.022 × 10²²", "3.141 × 10²³", "2.718 × 10²³"],
            correct: 0,
            hint: "Particles in one mole.",
            explanation: "6.022 × 10²³ particles per mole."
        },
        {
            question: "What is the molecular formula for methane?",
            options: ["CH4", "C2H6", "C3H8", "CH3OH"],
            correct: 0,
            hint: "Simplest hydrocarbon.",
            explanation: "CH₄ is methane."
        },
        {
            question: "Which process breaks down larger molecules?",
            options: ["Condensation", "Polymerization", "Hydrolysis", "Oxidation"],
            correct: 2,
            hint: "Involves adding water to break bonds.",
            explanation: "Hydrolysis breaks down molecules using water."
        },
        {
            question: "What is the charge of a proton?",
            options: ["Neutral", "+1", "-1", "+2"],
            correct: 1,
            hint: "Positively charged particle.",
            explanation: "Protons have +1 charge."
        },
        {
            question: "Which reaction releases energy?",
            options: ["Endothermic", "Exothermic", "Endergonic", "Isothermic"],
            correct: 1,
            hint: "Releases heat, negative ΔH.",
            explanation: "Exothermic reactions release energy."
        },
        {
            question: "What is the oxidation state of oxygen in most compounds?",
            options: ["+1", "+2", "-1", "-2"],
            correct: 3,
            hint: "Oxygen typically gains 2 electrons.",
            explanation: "Oxygen usually has -2 oxidation state."
        },
        {
            question: "Which functional group is present in alcohols?",
            options: ["-COOH", "-OH", "-CHO", "-NH2"],
            correct: 1,
            hint: "The hydroxyl group.",
            explanation: "Alcohols contain the -OH functional group."
        },
        {
            question: "What is the electron configuration of Neon?",
            options: ["1s²", "1s² 2s²", "1s² 2s² 2p⁶", "1s² 2s² 2p⁶ 3s²"],
            correct: 2,
            hint: "Neon has 10 electrons, filling the first two shells completely.",
            explanation: "Neon (10 electrons) has configuration 1s² 2s² 2p⁶."
        },
        {
            question: "What is the SI unit for pressure?",
            options: ["Pascal", "Joule", "Newton", "Watt"],
            correct: 0,
            hint: "Named after a French scientist, measured as force per unit area.",
            explanation: "Pascal (Pa) is the SI unit for pressure."
        },
        {
            question: "Which bond is strongest?",
            options: ["Ionic", "Covalent", "Hydrogen", "Van der Waals"],
            correct: 1,
            hint: "Bonds where electrons are shared tend to be very strong.",
            explanation: "Covalent bonds are typically stronger than ionic or intermolecular forces."
        },
        {
            question: "What happens to the volume of a gas when temperature increases (at constant pressure)?",
            options: ["Decreases", "Increases", "Stays the same", "Depends on the gas"],
            correct: 1,
            hint: "Think about Charles's Law - temperature and volume are directly proportional.",
            explanation: "According to Charles's Law, volume increases with temperature at constant pressure."
        },
        {
            question: "What is the formula for calculating molarity?",
            options: ["moles/volume(L)", "mass/volume", "moles × volume", "volume/moles"],
            correct: 0,
            hint: "Molarity is concentration expressed as moles per liter of solution.",
            explanation: "Molarity (M) = moles of solute / liters of solution."
        },
        {
            question: "Which process converts a liquid to a gas?",
            options: ["Condensation", "Evaporation", "Sublimation", "Deposition"],
            correct: 1,
            hint: "When a liquid becomes a vapor at temperatures below its boiling point.",
            explanation: "Evaporation converts liquid to gas below the boiling point."
        },
        {
            question: "What is the functional group in carboxylic acids?",
            options: ["-OH", "-COOH", "-CHO", "-CO"],
            correct: 1,
            hint: "Contains both a carbonyl and hydroxyl group.",
            explanation: "Carboxylic acids contain the -COOH (carboxyl) functional group."
        },
        {
            question: "Which principle states that electrons fill orbitals from lowest to highest energy?",
            options: ["Pauli Exclusion", "Hund's Rule", "Aufbau Principle", "Heisenberg Uncertainty"],
            correct: 2,
            hint: "This principle follows the order of increasing orbital energy levels.",
            explanation: "The Aufbau Principle states electrons fill orbitals from lowest to highest energy."
        }
    ],
    
    // 30 Questions Quiz - Comprehensive quiz
    quiz30: [
        {
            question: "What is the atomic number of Carbon?",
            options: ["5", "6", "12", "14"],
            correct: 1,
            hint: "6 protons in the nucleus.",
            explanation: "Carbon's atomic number is 6."
        },
        {
            question: "Which of the following is a noble gas?",
            options: ["Hydrogen", "Oxygen", "Neon", "Carbon"],
            correct: 2,
            hint: "Group 18 element.",
            explanation: "Neon is a noble gas."
        },
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "H2O2", "CO2", "NaCl"],
            correct: 0,
            hint: "H₂O.",
            explanation: "Water is H₂O."
        },
        {
            question: "What is the pH of a neutral solution?",
            options: ["0", "7", "14", "10"],
            correct: 1,
            hint: "Middle of the scale.",
            explanation: "pH 7 is neutral."
        },
        {
            question: "Which element has the symbol 'Na'?",
            options: ["Nitrogen", "Sodium", "Nickel", "Neon"],
            correct: 1,
            hint: "Soft metal, Group 1.",
            explanation: "Na is Sodium."
        },
        {
            question: "What is Avogadro's number?",
            options: ["6.022 × 10²³", "6.022 × 10²²", "3.141 × 10²³", "2.718 × 10²³"],
            correct: 0,
            hint: "Particles per mole.",
            explanation: "6.022 × 10²³ per mole."
        },
        {
            question: "What is the molecular formula for methane?",
            options: ["CH4", "C2H6", "C3H8", "CH3OH"],
            correct: 0,
            hint: "Simplest alkane.",
            explanation: "CH₄ is methane."
        },
        {
            question: "Which process breaks down larger molecules?",
            options: ["Condensation", "Polymerization", "Hydrolysis", "Oxidation"],
            correct: 2,
            hint: "Water breaks bonds.",
            explanation: "Hydrolysis breaks molecules."
        },
        {
            question: "What is the charge of a proton?",
            options: ["Neutral", "+1", "-1", "+2"],
            correct: 1,
            hint: "Positive charge.",
            explanation: "Protons are +1."
        },
        {
            question: "Which reaction releases energy?",
            options: ["Endothermic", "Exothermic", "Endergonic", "Isothermic"],
            correct: 1,
            hint: "Negative ΔH.",
            explanation: "Exothermic releases energy."
        },
        {
            question: "What is the oxidation state of oxygen in most compounds?",
            options: ["+1", "+2", "-1", "-2"],
            correct: 3,
            hint: "Gains 2 electrons.",
            explanation: "Oxygen is -2 usually."
        },
        {
            question: "Which functional group is in alcohols?",
            options: ["-COOH", "-OH", "-CHO", "-NH2"],
            correct: 1,
            hint: "Hydroxyl group.",
            explanation: "Alcohols have -OH."
        },
        {
            question: "What is the electron configuration of Neon?",
            options: ["1s²", "1s² 2s²", "1s² 2s² 2p⁶", "1s² 2s² 2p⁶ 3s²"],
            correct: 2,
            hint: "10 electrons total.",
            explanation: "Neon: 1s² 2s² 2p⁶."
        },
        {
            question: "What is the SI unit for pressure?",
            options: ["Pascal", "Joule", "Newton", "Watt"],
            correct: 0,
            hint: "Force per area.",
            explanation: "Pascal is pressure unit."
        },
        {
            question: "Which bond is strongest?",
            options: ["Ionic", "Covalent", "Hydrogen", "Van der Waals"],
            correct: 1,
            hint: "Shared electrons.",
            explanation: "Covalent bonds are strongest."
        },
        {
            question: "What happens to gas volume when temperature increases (constant pressure)?",
            options: ["Decreases", "Increases", "Stays same", "Depends"],
            correct: 1,
            hint: "Charles's Law.",
            explanation: "Volume increases with temperature."
        },
        {
            question: "What is the formula for molarity?",
            options: ["moles/volume(L)", "mass/volume", "moles × volume", "volume/moles"],
            correct: 0,
            hint: "Moles per liter.",
            explanation: "Molarity = moles/L."
        },
        {
            question: "Which converts liquid to gas?",
            options: ["Condensation", "Evaporation", "Sublimation", "Deposition"],
            correct: 1,
            hint: "Below boiling point.",
            explanation: "Evaporation converts liquid to gas."
        },
        {
            question: "What functional group is in carboxylic acids?",
            options: ["-OH", "-COOH", "-CHO", "-CO"],
            correct: 1,
            hint: "Carboxyl group.",
            explanation: "Carboxylic acids have -COOH."
        },
        {
            question: "Which principle states electrons fill lowest energy first?",
            options: ["Pauli Exclusion", "Hund's Rule", "Aufbau Principle", "Heisenberg"],
            correct: 2,
            hint: "Energy order filling.",
            explanation: "Aufbau Principle."
        },
        {
            question: "What is the mass number equal to?",
            options: ["Protons only", "Neutrons only", "Protons + Neutrons", "Electrons + Protons"],
            correct: 2,
            hint: "Total particles in nucleus.",
            explanation: "Mass number = protons + neutrons."
        },
        {
            question: "Which is an example of a strong acid?",
            options: ["Acetic acid", "Citric acid", "Hydrochloric acid", "Carbonic acid"],
            correct: 2,
            hint: "Completely ionizes in water.",
            explanation: "HCl is a strong acid that fully ionizes."
        },
        {
            question: "What is Le Chatelier's principle about?",
            options: ["Electron configuration", "Chemical equilibrium shifts", "Bond strength", "Molecular geometry"],
            correct: 1,
            hint: "When a system at equilibrium is disturbed, it shifts to counteract the disturbance.",
            explanation: "Le Chatelier's principle describes how equilibrium systems respond to changes."
        },
        {
            question: "Which type of isomerism involves different arrangements of atoms?",
            options: ["Structural", "Geometric", "Optical", "Conformational"],
            correct: 0,
            hint: "Same molecular formula, different connectivity.",
            explanation: "Structural isomers have different atom arrangements."
        },
        {
            question: "What is the ideal gas law equation?",
            options: ["PV = nRT", "E = mc²", "F = ma", "V = IR"],
            correct: 0,
            hint: "Relates pressure, volume, moles, and temperature.",
            explanation: "PV = nRT is the ideal gas law."
        },
        {
            question: "Which process involves gaining electrons?",
            options: ["Oxidation", "Reduction", "Ionization", "Dissociation"],
            correct: 1,
            hint: "OIL RIG: Reduction Is Gain (of electrons).",
            explanation: "Reduction involves gaining electrons."
        },
        {
            question: "What is the name for NH₃?",
            options: ["Nitric acid", "Nitrogen", "Ammonia", "Nitrite"],
            correct: 2,
            hint: "Common household cleaner and fertilizer ingredient.",
            explanation: "NH₃ is ammonia."
        },
        {
            question: "Which subatomic particle has no charge?",
            options: ["Proton", "Electron", "Neutron", "Positron"],
            correct: 2,
            hint: "Found in the nucleus with protons.",
            explanation: "Neutrons have no electrical charge."
        },
        {
            question: "What is the rate of a reaction affected by?",
            options: ["Temperature only", "Concentration only", "Temperature and concentration", "Time only"],
            correct: 2,
            hint: "Multiple factors influence reaction rates.",
            explanation: "Reaction rates depend on temperature, concentration, catalysts, and surface area."
        },
        {
            question: "Which describes a solution with pH less than 7?",
            options: ["Basic", "Neutral", "Acidic", "Alkaline"],
            correct: 2,
            hint: "Has more H⁺ ions than OH⁻ ions.",
            explanation: "Acidic solutions have pH < 7."
        }
    ],
    
    // 40 Questions Quiz - Complete quiz
    quiz40: [
        {
            question: "What is the atomic number of Carbon?",
            options: ["5", "6", "12", "14"],
            correct: 1,
            hint: "6 protons.",
            explanation: "Carbon: atomic number 6."
        },
        {
            question: "Which is a noble gas?",
            options: ["Hydrogen", "Oxygen", "Neon", "Carbon"],
            correct: 2,
            hint: "Group 18.",
            explanation: "Neon is noble gas."
        },
        {
            question: "What is the formula for water?",
            options: ["H2O", "H2O2", "CO2", "NaCl"],
            correct: 0,
            hint: "H₂O.",
            explanation: "Water is H₂O."
        },
        {
            question: "What is neutral pH?",
            options: ["0", "7", "14", "10"],
            correct: 1,
            hint: "Middle.",
            explanation: "pH 7 is neutral."
        },
        {
            question: "What element is 'Na'?",
            options: ["Nitrogen", "Sodium", "Nickel", "Neon"],
            correct: 1,
            hint: "Soft metal.",
            explanation: "Na is Sodium."
        },
        {
            question: "What is Avogadro's number?",
            options: ["6.022 × 10²³", "6.022 × 10²²", "3.141 × 10²³", "2.718 × 10²³"],
            correct: 0,
            hint: "Particles per mole.",
            explanation: "6.022 × 10²³."
        },
        {
            question: "What is methane's formula?",
            options: ["CH4", "C2H6", "C3H8", "CH3OH"],
            correct: 0,
            hint: "Simplest alkane.",
            explanation: "CH₄ is methane."
        },
        {
            question: "What breaks down larger molecules?",
            options: ["Condensation", "Polymerization", "Hydrolysis", "Oxidation"],
            correct: 2,
            hint: "Uses water.",
            explanation: "Hydrolysis."
        },
        {
            question: "What is proton charge?",
            options: ["Neutral", "+1", "-1", "+2"],
            correct: 1,
            hint: "Positive.",
            explanation: "Protons are +1."
        },
        {
            question: "What reaction releases energy?",
            options: ["Endothermic", "Exothermic", "Endergonic", "Isothermic"],
            correct: 1,
            hint: "Negative ΔH.",
            explanation: "Exothermic."
        },
        {
            question: "What is oxygen's oxidation state?",
            options: ["+1", "+2", "-1", "-2"],
            correct: 3,
            hint: "Gains 2 electrons.",
            explanation: "Oxygen is -2."
        },
        {
            question: "What functional group in alcohols?",
            options: ["-COOH", "-OH", "-CHO", "-NH2"],
            correct: 1,
            hint: "Hydroxyl.",
            explanation: "Alcohols have -OH."
        },
        {
            question: "What is Neon's electron config?",
            options: ["1s²", "1s² 2s²", "1s² 2s² 2p⁶", "1s² 2s² 2p⁶ 3s²"],
            correct: 2,
            hint: "10 electrons.",
            explanation: "1s² 2s² 2p⁶."
        },
        {
            question: "What is SI unit for pressure?",
            options: ["Pascal", "Joule", "Newton", "Watt"],
            correct: 0,
            hint: "Force per area.",
            explanation: "Pascal."
        },
        {
            question: "Which bond is strongest?",
            options: ["Ionic", "Covalent", "Hydrogen", "Van der Waals"],
            correct: 1,
            hint: "Shared electrons.",
            explanation: "Covalent."
        },
        {
            question: "Gas volume when temp increases?",
            options: ["Decreases", "Increases", "Same", "Depends"],
            correct: 1,
            hint: "Charles's Law.",
            explanation: "Increases."
        },
        {
            question: "Molarity formula?",
            options: ["moles/volume(L)", "mass/volume", "moles × volume", "volume/moles"],
            correct: 0,
            hint: "Moles per liter.",
            explanation: "moles/L."
        },
        {
            question: "Liquid to gas?",
            options: ["Condensation", "Evaporation", "Sublimation", "Deposition"],
            correct: 1,
            hint: "Below boiling.",
            explanation: "Evaporation."
        },
        {
            question: "Functional group in carboxylic acids?",
            options: ["-OH", "-COOH", "-CHO", "-CO"],
            correct: 1,
            hint: "Carboxyl.",
            explanation: "-COOH."
        },
        {
            question: "Electrons fill lowest energy first?",
            options: ["Pauli", "Hund's", "Aufbau", "Heisenberg"],
            correct: 2,
            hint: "Energy order.",
            explanation: "Aufbau Principle."
        },
        {
            question: "What is mass number?",
            options: ["Protons", "Neutrons", "Protons + Neutrons", "Electrons + Protons"],
            correct: 2,
            hint: "Nucleus particles.",
            explanation: "Protons + neutrons."
        },
        {
            question: "Which is strong acid?",
            options: ["Acetic", "Citric", "Hydrochloric", "Carbonic"],
            correct: 2,
            hint: "Fully ionizes.",
            explanation: "HCl is strong acid."
        },
        {
            question: "What is Le Chatelier's principle?",
            options: ["Electrons", "Equilibrium shifts", "Bonds", "Geometry"],
            correct: 1,
            hint: "Response to disturbance.",
            explanation: "Equilibrium shifts."
        },
        {
            question: "Structural isomerism?",
            options: ["Structural", "Geometric", "Optical", "Conformational"],
            correct: 0,
            hint: "Different connectivity.",
            explanation: "Structural isomers."
        },
        {
            question: "Ideal gas law?",
            options: ["PV = nRT", "E = mc²", "F = ma", "V = IR"],
            correct: 0,
            hint: "P, V, n, T relation.",
            explanation: "PV = nRT."
        },
        {
            question: "What involves gaining electrons?",
            options: ["Oxidation", "Reduction", "Ionization", "Dissociation"],
            correct: 1,
            hint: "OIL RIG - Reduction Is Gain.",
            explanation: "Reduction."
        },
        {
            question: "What is NH₃?",
            options: ["Nitric acid", "Nitrogen", "Ammonia", "Nitrite"],
            correct: 2,
            hint: "Common compound.",
            explanation: "NH₃ is ammonia."
        },
        {
            question: "Which has no charge?",
            options: ["Proton", "Electron", "Neutron", "Positron"],
            correct: 2,
            hint: "In nucleus.",
            explanation: "Neutron."
        },
        {
            question: "What affects reaction rate?",
            options: ["Temp only", "Conc only", "Temp and conc", "Time only"],
            correct: 2,
            hint: "Multiple factors.",
            explanation: "Temperature and concentration."
        },
        {
            question: "pH < 7 is?",
            options: ["Basic", "Neutral", "Acidic", "Alkaline"],
            correct: 2,
            hint: "More H⁺.",
            explanation: "Acidic."
        },
        {
            question: "What is the shape of a water molecule?",
            options: ["Linear", "Tetrahedral", "Bent", "Trigonal planar"],
            correct: 2,
            hint: "Water has 2 lone pairs on oxygen, causing a bent shape.",
            explanation: "Water has a bent molecular geometry due to two lone pairs on oxygen."
        },
        {
            question: "What is the maximum number of electrons in the second shell?",
            options: ["2", "8", "18", "32"],
            correct: 1,
            hint: "The second shell can hold 2 in s orbital and 6 in p orbitals.",
            explanation: "The second shell (n=2) can hold maximum 8 electrons (2s² + 2p⁶)."
        },
        {
            question: "Which is an example of a buffer solution?",
            options: ["Pure water", "Sodium chloride solution", "Acetic acid + sodium acetate", "Concentrated acid"],
            correct: 2,
            hint: "A weak acid and its conjugate base together resist pH changes.",
            explanation: "Buffer solutions contain a weak acid and its conjugate base, like acetic acid and sodium acetate."
        },
        {
            question: "What is the difference between an aldehyde and a ketone?",
            options: ["Aldehyde has C=O at end, ketone in middle", "Ketone has C=O at end, aldehyde in middle", "No difference", "Different number of carbons"],
            correct: 0,
            hint: "Aldehydes have the carbonyl group at the end of the carbon chain.",
            explanation: "Aldehydes have C=O at the end of the chain, ketones have it in the middle."
        },
        {
            question: "What is the relationship between pressure and volume (at constant temperature)?",
            options: ["Direct", "Inverse", "No relationship", "Exponential"],
            correct: 1,
            hint: "Boyle's Law states this relationship.",
            explanation: "According to Boyle's Law, pressure and volume are inversely proportional at constant temperature."
        },
        {
            question: "Which is a reducing agent?",
            options: ["Oxidizes others", "Reduces others", "Neutral", "Catalyst"],
            correct: 1,
            hint: "A reducing agent causes reduction by being oxidized itself.",
            explanation: "A reducing agent reduces other substances by losing electrons (being oxidized)."
        },
        {
            question: "What is the hybridization of carbon in methane (CH₄)?",
            options: ["sp", "sp²", "sp³", "sp³d"],
            correct: 2,
            hint: "Methane has 4 single bonds, requiring 4 hybrid orbitals.",
            explanation: "Carbon in CH₄ has sp³ hybridization to form 4 equivalent bonds."
        },
        {
            question: "What is the half-life of a radioactive element?",
            options: ["Time to fully decay", "Time for half to decay", "Time to double", "Time constant"],
            correct: 1,
            hint: "The time required for half of the radioactive material to decay.",
            explanation: "Half-life is the time for half of a radioactive sample to decay."
        },
        {
            question: "Which process is used to separate mixtures based on boiling points?",
            options: ["Filtration", "Distillation", "Chromatography", "Crystallization"],
            correct: 1,
            hint: "This process involves heating and condensing vapors.",
            explanation: "Distillation separates components based on differences in boiling points."
        },
        {
            question: "What is the molecular geometry of CO₂?",
            options: ["Linear", "Bent", "Tetrahedral", "Trigonal planar"],
            correct: 0,
            hint: "CO₂ has no lone pairs on carbon, with two double bonds.",
            explanation: "CO₂ has linear geometry due to two double bonds and no lone pairs on carbon."
        }
    ]
};

/* ========================================
   QUIZ STATE VARIABLES
   ========================================
   Tracks current quiz state
*/
let currentQuiz = null;          // Currently active quiz (array of questions)
let currentQuestionIndex = 0;    // Index of current question (0-based)
let score = 0;                    // Number of correct answers
let selectedAnswers = [];         // Array storing user's selected answers
let hintsShown = [];              // Track which hints have been shown

/* ========================================
   INITIALIZE QUIZ
   ========================================
   Sets up a quiz for a specific size/topic.
   
   Parameters:
   - topic: String - Quiz identifier ('quiz5', 'quiz10', 'quiz20', 'quiz30', 'quiz40')
*/
function initQuiz(topic) {
    // Find quiz container element
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;  // Exit if no quiz container exists
    
    // Show the quiz container (in case it was hidden)
    quizContainer.style.display = 'block';
    
    // Hide the quiz size selection buttons
    const sizeSelection = quizContainer.querySelector('#quiz-size-selection');
    if (sizeSelection) {
        sizeSelection.style.display = 'none';
    }
    
    // Scroll to quiz container smoothly
    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Get quiz questions for selected topic, default to 'quiz10' if topic not found
    currentQuiz = quizzes[topic] || quizzes.quiz10;
    
    // Reset quiz state
    currentQuestionIndex = 0;  // Start at first question
    score = 0;                  // Reset score
    selectedAnswers = [];       // Clear previous answers
    hintsShown = [];           // Clear hints shown tracker
    
    // Clear previous quiz content (but keep the title and size selection)
    const quizContent = quizContainer.querySelector('.quiz-content');
    if (quizContent) {
        quizContent.innerHTML = '';  // Clear all previous questions
    }
    
    // Remove previous navigation buttons if they exist
    const existingNav = quizContainer.querySelector('.quiz-nav');
    if (existingNav) {
        existingNav.remove();
    }
    
    // Display first question
    displayQuestion();
    
    // ========================================
    // CREATE NAVIGATION BUTTONS
    // ========================================
    // Only create buttons once if they don't exist
    if (!quizContainer.querySelector('.quiz-nav')) {
        // Create navigation container
        const navDiv = document.createElement('div');
        navDiv.className = 'quiz-nav';
        navDiv.style.marginTop = '2rem';
        navDiv.style.display = 'flex';
        navDiv.style.gap = '1rem';
        navDiv.style.justifyContent = 'space-between';
        
        // Previous Button - Go to previous question
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn';
        prevBtn.textContent = 'Previous';
        prevBtn.style.display = 'none';  // Hidden on first question
        
        // Next Button - Go to next question
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn';
        nextBtn.textContent = 'Next';
        
        // Submit Button - Finish quiz and show results
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn';
        submitBtn.textContent = 'Submit Quiz';
        submitBtn.style.display = 'none';  // Hidden until last question
        
        // Add buttons to navigation container
        navDiv.appendChild(prevBtn);
        navDiv.appendChild(nextBtn);
        navDiv.appendChild(submitBtn);
        
        // Add navigation to quiz-content container (or quiz-container if quiz-content doesn't exist)
        const quizContent = quizContainer.querySelector('.quiz-content');
        if (quizContent) {
            quizContent.appendChild(navDiv);
        } else {
            quizContainer.appendChild(navDiv);
        }
        
        // ========================================
        // NAVIGATION BUTTON EVENT HANDLERS
        // ========================================
        
        // Previous Button Click - Go back one question
        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                saveAnswer();  // Save current answer before moving
                currentQuestionIndex--;  // Decrease index
                displayQuestion();       // Show previous question
            }
        });
        
        // Next Button Click - Advance to next question
        nextBtn.addEventListener('click', () => {
            saveAnswer();  // Save current answer before moving
            if (currentQuestionIndex < currentQuiz.length - 1) {
                currentQuestionIndex++;  // Increase index
                displayQuestion();       // Show next question
            } else {
                // Last question - show results
                showResults();
            }
        });
        
        // Submit Button Click - Finish quiz
        submitBtn.addEventListener('click', () => {
            saveAnswer();   // Save final answer
            showResults();  // Display results
        });
    }
}

/* ========================================
   DISPLAY QUESTION
   ========================================
   Shows the current question, answer options, and hint button.
   Updates navigation button visibility.
*/
function displayQuestion() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer || !currentQuiz) return;  // Exit if no container or quiz
    
    // Get current question from quiz array
    const question = currentQuiz[currentQuestionIndex];
    
    // Find or create question display element
    const questionDiv = quizContainer.querySelector('.question') || document.createElement('div');
    questionDiv.className = 'question';
    
    // Check if hint was already shown for this question
    const hintShown = hintsShown[currentQuestionIndex] || false;
    
    // Build question HTML with options and hint button
    questionDiv.innerHTML = `
        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Question ${currentQuestionIndex + 1} of ${currentQuiz.length}</h3>
        <p style="font-size: 1.1rem; margin: 1rem 0; font-weight: 500;">${question.question}</p>
        ${hintShown && question.hint ? `
            <div class="hint-display" style="background: rgba(255, 193, 7, 0.1); border-left: 4px solid #FFC107; padding: 1rem; margin: 1rem 0; border-radius: 5px;">
                <strong style="color: #FF9800;">💡 Hint:</strong>
                <p style="margin: 0.5rem 0 0 0; color: var(--text-color);">${question.hint}</p>
            </div>
        ` : ''}
        <button class="hint-btn btn" style="background: var(--accent-color); margin-bottom: 1rem; ${hintShown ? 'display: none;' : ''}">
            💡 Show Hint
        </button>
        <ul class="options">
            ${question.options.map((option, index) => `
                <li class="option ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}" 
                    data-index="${index}">
                    ${option}
                </li>
            `).join('')}
        </ul>
    `;
    
    // Find or create quiz-content container
    let quizContent = quizContainer.querySelector('.quiz-content');
    if (!quizContent) {
        quizContent = document.createElement('div');
        quizContent.className = 'quiz-content';
        quizContainer.appendChild(quizContent);
    }
    
    // Add question div to quiz-content container if it doesn't exist
    if (!quizContent.querySelector('.question')) {
        quizContent.appendChild(questionDiv);
    } else {
        // Update existing question div
        quizContent.querySelector('.question').innerHTML = questionDiv.innerHTML;
    }
    
    // ========================================
    // UPDATE NAVIGATION BUTTONS
    // ========================================
    const prevBtn = quizContainer.querySelector('.quiz-nav .btn:first-child');
    const nextBtn = quizContainer.querySelector('.quiz-nav .btn:nth-child(2)');
    const submitBtn = quizContainer.querySelector('.quiz-nav .btn:last-child');
    
    // Show/hide Previous button (hidden on first question)
    if (prevBtn) prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    
    // Show/hide Next button (hidden on last question)
    if (nextBtn) nextBtn.style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'none' : 'inline-block';
    
    // Show/hide Submit button (only on last question)
    if (submitBtn) submitBtn.style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'inline-block' : 'none';
    
    // ========================================
    // HINT BUTTON EVENT HANDLER
    // ========================================
    const hintBtn = questionDiv.querySelector('.hint-btn');
    if (hintBtn && question.hint) {
        hintBtn.addEventListener('click', function() {
            hintsShown[currentQuestionIndex] = true;  // Mark hint as shown
            displayQuestion();  // Re-display to show hint
        });
    }
    
    // ========================================
    // OPTION CLICK HANDLERS
    // ========================================
    // Add click listeners to each answer option
    questionDiv.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            questionDiv.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected answer index
            selectedAnswers[currentQuestionIndex] = parseInt(this.dataset.index);
        });
    });
}

/* ========================================
   SAVE ANSWER
   ========================================
   Saves the currently selected answer before navigation.
*/
function saveAnswer() {
    // Find the selected option
    const selected = document.querySelector('.option.selected');
    if (selected) {
        // Store the answer index
        selectedAnswers[currentQuestionIndex] = parseInt(selected.dataset.index);
    }
}

/* ========================================
   SHOW QUIZ RESULTS
   ========================================
   Calculates score and displays comprehensive results.
   Shows all answers with correct/incorrect indicators.
   Displays explanations for all questions.
*/
function showResults() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    // ========================================
    // CALCULATE SCORE
    // ========================================
    score = 0;  // Reset score
    
    // Loop through all questions and check answers
    const results = currentQuiz.map((question, index) => {
        const userAnswer = selectedAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) {
            score++;  // Increment score for correct answers
        }
        
        return {
            question,
            userAnswer,
            isCorrect,
            correctAnswer: question.correct
        };
    });
    
    // Calculate percentage
    const percentage = Math.round((score / currentQuiz.length) * 100);
    
    // Determine performance message
    let performanceMessage = '';
    let performanceColor = '';
    if (percentage >= 90) {
        performanceMessage = 'Excellent! 🎉';
        performanceColor = '#4CAF50';
    } else if (percentage >= 70) {
        performanceMessage = 'Good Job! 👍';
        performanceColor = '#2196F3';
    } else if (percentage >= 50) {
        performanceMessage = 'Not Bad! Keep Learning! 📚';
        performanceColor = '#FF9800';
    } else {
        performanceMessage = 'Keep Practicing! 💪';
        performanceColor = '#f44336';
    }
    
    // ========================================
    // BUILD RESULTS HTML
    // ========================================
    const resultDiv = document.createElement('div');
    resultDiv.className = 'quiz-result';
    resultDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2>Quiz Results</h2>
            <div style="font-size: 3rem; font-weight: bold; color: ${performanceColor}; margin: 1rem 0;">
                ${score}/${currentQuiz.length}
            </div>
            <div style="font-size: 1.5rem; color: ${performanceColor}; margin: 0.5rem 0;">
                ${percentage}%
            </div>
            <div style="font-size: 1.2rem; color: var(--text-color); margin-top: 1rem;">
                ${performanceMessage}
            </div>
        </div>
        
        <div style="margin: 2rem 0;">
            <h3 style="margin-bottom: 1.5rem; color: var(--primary-color);">Detailed Review:</h3>
            ${results.map((result, index) => {
                const { question, userAnswer, isCorrect, correctAnswer } = result;
                const userAnswerText = userAnswer !== undefined && userAnswer !== null 
                    ? question.options[userAnswer] 
                    : 'Not answered';
                const correctAnswerText = question.options[correctAnswer];
                
                return `
                    <div style="margin: 1.5rem 0; padding: 1.5rem; background: var(--card-bg); border-radius: 8px; border-left: 5px solid ${isCorrect ? '#4CAF50' : '#f44336'};">
                        <div style="display: flex; align-items: start; margin-bottom: 1rem;">
                            <span style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; background: ${isCorrect ? '#4CAF50' : '#f44336'}; color: white; text-align: center; line-height: 30px; font-weight: bold; margin-right: 1rem; flex-shrink: 0;">
                                ${isCorrect ? '✓' : '✗'}
                            </span>
                            <div style="flex: 1;">
                                <p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-color);">
                                    <strong>Question ${index + 1}:</strong> ${question.question}
                                </p>
                                
                                <div style="margin: 0.75rem 0; padding: 0.75rem; background: var(--bg-color); border-radius: 5px;">
                                    <strong style="color: ${isCorrect ? '#4CAF50' : '#f44336'}; display: block; margin-bottom: 0.5rem;">
                                        Your Answer:
                                    </strong>
                                    <span style="color: ${isCorrect ? '#4CAF50' : '#f44336'}; font-weight: 500;">
                                        ${userAnswerText}
                                    </span>
                                    ${!isCorrect ? `
                                        <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                                            <strong style="color: #4CAF50; display: block; margin-bottom: 0.5rem;">
                                                Correct Answer:
                                            </strong>
                                            <span style="color: #4CAF50; font-weight: 500;">
                                                ${correctAnswerText}
                                            </span>
                                        </div>
                                    ` : ''}
                                </div>
                                
                                ${question.explanation ? `
                                    <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(33, 150, 243, 0.1); border-left: 3px solid var(--primary-color); border-radius: 5px;">
                                        <strong style="color: var(--primary-color); display: block; margin-bottom: 0.5rem;">
                                            Explanation:
                                        </strong>
                                        <p style="margin: 0; color: var(--text-color); line-height: 1.6;">
                                            ${question.explanation}
                                        </p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn" id="restart-quiz-btn" style="font-size: 1.1rem; padding: 0.875rem 2rem;">
                Take Quiz Again
            </button>
        </div>
    `;
    
    // Replace quiz content with results (but keep the title)
    const quizContent = quizContainer.querySelector('.quiz-content');
    if (quizContent) {
        quizContent.innerHTML = '';  // Clear questions
        quizContent.appendChild(resultDiv);  // Add results
    } else {
        // Fallback: replace everything if quiz-content doesn't exist
        quizContainer.innerHTML = '';
        quizContainer.appendChild(resultDiv);
    }
    
    // Remove navigation buttons
    const existingNav = quizContainer.querySelector('.quiz-nav');
    if (existingNav) {
        existingNav.remove();
    }
    
    // Add event listener to "Take Quiz Again" button to show size selection
    const restartBtn = quizContainer.querySelector('#restart-quiz-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            // Clear quiz content
            const quizContent = quizContainer.querySelector('.quiz-content');
            if (quizContent) {
                quizContent.innerHTML = '';
            }
            
            // Show size selection again
            const sizeSelection = quizContainer.querySelector('#quiz-size-selection');
            if (sizeSelection) {
                sizeSelection.style.display = 'block';
            }
            
            // Scroll to top of quiz container
            quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

/* ========================================
   AUTO-INITIALIZE QUIZ SYSTEM
   ========================================
   Sets up quiz buttons and auto-starts quiz if container exists.
*/
document.addEventListener('DOMContentLoaded', function() {
    // Find all buttons with data-quiz-topic attribute
    const quizButtons = document.querySelectorAll('[data-quiz-topic]');
    
    // Add click listeners to start quizzes
    quizButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const topic = this.dataset.quizTopic;  // Get topic from data attribute
            initQuiz(topic);  // Initialize quiz for that topic
        });
    });
    
    // Auto-start quiz10 if quiz container exists (for demo purposes)
    if (document.querySelector('.quiz-container') && !quizButtons.length) {
        initQuiz('quiz10');
    }
});
