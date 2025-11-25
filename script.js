
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // --- DATA (Expanded with more schedules per ASME B36.10M/B36.19M and Materials) ---
    // =================================================================================

    const pipeData = {
        // OD and WT in inches.
        '1/8"':     { od_in: 0.405, schedules: { '10S': 0.049, '40S': 0.068, 'STD': 0.068, '80S': 0.095, 'XS': 0.095 } },
        '1/4"':     { od_in: 0.540, schedules: { '10S': 0.065, '40S': 0.088, 'STD': 0.088, '80S': 0.119, 'XS': 0.119 } },
        '3/8"':     { od_in: 0.675, schedules: { '10S': 0.065, '40S': 0.091, 'STD': 0.091, '80S': 0.126, 'XS': 0.126 } },
        '1/2"':     { od_in: 0.840, schedules: { '5S': 0.065, '10S': 0.083, '40S': 0.109, 'STD': 0.109, '80S': 0.147, 'XS': 0.147, '160': 0.188, 'XXS': 0.294 } },
        '3/4"':     { od_in: 1.050, schedules: { '5S': 0.065, '10S': 0.083, '40S': 0.113, 'STD': 0.113, '80S': 0.154, 'XS': 0.154, '160': 0.219, 'XXS': 0.308 } },
        '1"':       { od_in: 1.315, schedules: { '5S': 0.065, '10S': 0.109, '40S': 0.133, 'STD': 0.133, '80S': 0.179, 'XS': 0.179, '160': 0.250, 'XXS': 0.358 } },
        '1 1/4"':   { od_in: 1.660, schedules: { '5S': 0.065, '10S': 0.109, '40S': 0.140, 'STD': 0.140, '80S': 0.191, 'XS': 0.191, '160': 0.250, 'XXS': 0.382 } },
        '1 1/2"':   { od_in: 1.900, schedules: { '5S': 0.065, '10S': 0.109, '40S': 0.145, 'STD': 0.145, '80S': 0.200, 'XS': 0.200, '160': 0.281, 'XXS': 0.400 } },
        '2"':       { od_in: 2.375, schedules: { '5S': 0.065, '10S': 0.109, '40S': 0.154, 'STD': 0.154, '80S': 0.218, 'XS': 0.218, '160': 0.344, 'XXS': 0.436 } },
        '2 1/2"':   { od_in: 2.875, schedules: { '5S': 0.083, '10S': 0.120, '40S': 0.203, 'STD': 0.203, '80S': 0.276, 'XS': 0.276, '160': 0.375, 'XXS': 0.552 } },
        '3"':       { od_in: 3.500, schedules: { '5S': 0.083, '10S': 0.120, '40S': 0.216, 'STD': 0.216, '80S': 0.300, 'XS': 0.300, '160': 0.438, 'XXS': 0.600 } },
        '3 1/2"':   { od_in: 4.000, schedules: { '5S': 0.083, '10S': 0.120, '40S': 0.226, 'STD': 0.226, '80S': 0.318, 'XS': 0.318, '160': 0.469 } },
        '4"':       { od_in: 4.500, schedules: { '5S': 0.083, '10S': 0.120, '40S': 0.237, 'STD': 0.237, '80S': 0.337, 'XS': 0.337, '120': 0.438, '160': 0.531, 'XXS': 0.674 } },
        '5"':       { od_in: 5.563, schedules: { '5S': 0.109, '10S': 0.134, '40S': 0.258, 'STD': 0.258, '80S': 0.375, 'XS': 0.375, '120': 0.500, '160': 0.625, 'XXS': 0.750 } },
        '6"':       { od_in: 6.625, schedules: { '5S': 0.109, '10S': 0.134, '40S': 0.280, 'STD': 0.280, '80S': 0.432, 'XS': 0.432, '120': 0.562, '160': 0.719, 'XXS': 0.864 } },
        '8"':       { od_in: 8.625, schedules: { '5S': 0.109, '10S': 0.148, '20': 0.250, '30': 0.277, '40S': 0.322, 'STD': 0.322, '60': 0.406, '80S': 0.500, 'XS': 0.500, '100': 0.594, '120': 0.719, '140': 0.812, '160': 0.906, 'XXS': 0.875 } },
        '10"':      { od_in: 10.75, schedules: { '5S': 0.134, '10S': 0.165, '20': 0.250, '30': 0.307, '40S': 0.365, 'STD': 0.365, '60': 0.500, 'XS': 0.500, '80S': 0.594, '100': 0.719, '120': 0.844, '140': 0.969, '160': 1.125, 'XXS': 1.000 } },
        '12"':      { od_in: 12.75, schedules: { '10S': 0.180, '20': 0.250, 'STD': 0.375, '30': 0.330, '40S': 0.406, 'XS': 0.500, '60': 0.562, '80S': 0.688, '100': 0.844, '120': 1.000, '140': 1.125, '160': 1.312, 'XXS': 1.125 } },
        '14"':      { od_in: 14.00, schedules: { '10': 0.250, '20': 0.312, '30': 0.375, 'STD': 0.375, '40': 0.438, 'XS': 0.500, '60': 0.594, '80': 0.750, '100': 0.938, '120': 1.094, '140': 1.250, '160': 1.406 } },
        '16"':      { od_in: 16.00, schedules: { '10': 0.250, '20': 0.312, '30': 0.375, 'STD': 0.375, '40': 0.500, 'XS': 0.500, '60': 0.656, '80': 0.844, '100': 1.031, '120': 1.219, '140': 1.438, '160': 1.594 } },
        '18"':      { od_in: 18.00, schedules: { '10': 0.250, '20': 0.312, 'STD': 0.375, '30': 0.438, 'XS': 0.500, '40': 0.562, '60': 0.750, '80': 0.938, '100': 1.156, '120': 1.375, '140': 1.562, '160': 1.781 } },
        '20"':      { od_in: 20.00, schedules: { '10': 0.250, '20': 0.375, 'STD': 0.375, 'XS': 0.500, '30': 0.500, '40': 0.594, '60': 0.812, '80': 1.031, '100': 1.281, '120': 1.500, '140': 1.750, '160': 1.969 } },
        '22"':      { od_in: 22.00, schedules: { '10': 0.250, '20': 0.375, 'STD': 0.375, 'XS': 0.500, '30': 0.500, '60': 0.875, '80': 1.125, '100': 1.406, '120': 1.625, '140': 1.875, '160': 2.125 } },
        '24"':      { od_in: 24.00, schedules: { '10': 0.250, '20': 0.375, 'STD': 0.375, 'XS': 0.500, '30': 0.562, '40': 0.688, '60': 0.969, '80': 1.219, '100': 1.531, '120': 1.812, '140': 2.062, '160': 2.344 } },
        '26"':      { od_in: 26.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '28"':      { od_in: 28.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '30"':      { od_in: 30.00, schedules: { 'STD': 0.375, 'XS': 0.500, '40': 0.750 } },
        '32"':      { od_in: 32.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '34"':      { od_in: 34.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '36"':      { od_in: 36.00, schedules: { 'STD': 0.375, 'XS': 0.500, '40': 0.750 } },
        '40"':      { od_in: 40.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '42"':      { od_in: 42.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '48"':      { od_in: 48.00, schedules: { 'STD': 0.375, 'XS': 0.500 } },
        '54"':      { od_in: 54.00, schedules: { 'STD': 0.500, 'XS': 0.500 } },
        '60"':      { od_in: 60.00, schedules: { 'STD': 0.500, 'XS': 0.500 } },
    };

    const materialData = {
        // Properties at room temp. Density in kg/m3, Stresses & Modulus in MPa
        // Sc/Sh/E values are approximate and for general guidance.
        // Carbon Steel
        'A106 Grade A':   { description: 'Carbon Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A106 Grade B':   { description: 'Carbon Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A106 Grade C':   { description: 'Carbon Steel', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        'A53 Grade A':    { description: 'Carbon Steel', density: 7850, Sc: 124, Sh: 124, E: 200000 },
        'A53 Grade B':    { description: 'Carbon Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'API 5L Grade A': { description: 'Line Pipe Steel', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        'API 5L Grade B': { description: 'Line Pipe Steel', density: 7850, Sc: 165, Sh: 165, E: 200000 },
        'API 5L Grade X42':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 207, Sh: 207, E: 200000 },
        'API 5L Grade X46':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 234, Sh: 234, E: 200000 },
        'API 5L Grade X52':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 255, Sh: 255, E: 200000 },
        'API 5L Grade X56':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 280, Sh: 280, E: 200000 },
        'API 5L Grade X60':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 290, Sh: 290, E: 200000 },
        'API 5L Grade X65':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 300, Sh: 300, E: 200000 },
        'API 5L Grade X70':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 320, Sh: 320, E: 200000 },
        'API 5L Grade X80':{ description: 'Line Pipe Steel (High Yield)', density: 7850, Sc: 345, Sh: 345, E: 200000 },
        'A333 Grade 1':   { description: 'Low Temp Carbon Steel', density: 7850, Sc: 124, Sh: 124, E: 200000 },
        'A333 Grade 3':   { description: 'Low Temp Carbon Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A333 Grade 6':   { description: 'Low Temp Carbon Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A587':           { description: 'Electric-Resistance-Welded Carbon Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A135':           { description: 'Electric-Resistance-Welded Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A139':           { description: 'Electric-Fusion (ARC)-Welded Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A672':           { description: 'Electric-Fusion-Welded Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A671':           { description: 'Electric-Fusion-Welded Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A381':           { description: 'Metal-ARC-Welded Steel Pipe', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        // Alloy Steel
        'A335 P1':        { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A335 P2':        { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A335 P5':        { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A335 P9':        { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A335 P11':       { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        'A335 P12':       { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A335 P22':       { description: 'Cr-Mo Alloy Steel', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        'A335 P91':       { description: 'Cr-Mo-V Alloy Steel', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        'A213 T11':       { description: 'Alloy Steel Boiler Tube', density: 7850, Sc: 138, Sh: 138, E: 200000 },
        'A213 T22':       { description: 'Alloy Steel Boiler Tube', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        'A213 T91':       { description: 'Alloy Steel Boiler Tube', density: 7850, Sc: 152, Sh: 152, E: 200000 },
        // Stainless Steel
        'A312 TP304':     { description: 'Stainless Steel', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'A312 TP304L':    { description: 'Stainless Steel (Low Carbon)', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'A312 TP316':     { description: 'Stainless Steel (Molybdenum)', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'A312 TP316L':    { description: 'Stainless Steel (Low Carbon Molybdenum)', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'A312 TP321':     { description: 'Stainless Steel (Titanium Stabilized)', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'A312 TP347':     { description: 'Stainless Steel (Niobium Stabilized)', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'A358':           { description: 'Electric-Fusion-Welded Austenitic Chromium-Nickel', density: 8000, Sc: 138, Sh: 138, E: 193000 },
        'Duplex 2205':    { description: 'Duplex Stainless Steel', density: 7820, Sc: 230, Sh: 230, E: 200000 },
        'Super Duplex 2507':{ description: 'Super Duplex Stainless Steel', density: 7850, Sc: 275, Sh: 275, E: 200000 },
        '904L':           { description: 'High Alloy Austenitic Stainless Steel', density: 8000, Sc: 152, Sh: 152, E: 190000 },
        // Copper Alloys
        'Copper (CU)':    { description: 'Copper', density: 8940, Sc: 70, Sh: 70, E: 110000 },
        'Copper Nickel 90/10': { description: 'Copper-Nickel (90% Cu, 10% Ni)', density: 8940, Sc: 90, Sh: 90, E: 120000 },
        'Copper Nickel 70/30': { description: 'Copper-Nickel (70% Cu, 30% Ni)', density: 8940, Sc: 100, Sh: 100, E: 130000 },
        'Brass':          { description: 'Brass (Copper-Zinc Alloy)', density: 8500, Sc: 80, Sh: 80, E: 100000 },
        // Nickel Alloys
        'Inconel 600':    { description: 'Nickel-Chromium Alloy', density: 8470, Sc: 207, Sh: 207, E: 207000 },
        'Inconel 625':    { description: 'Nickel-Chromium-Molybdenum Alloy', density: 8440, Sc: 275, Sh: 275, E: 207000 },
        'Inconel 718':    { description: 'Nickel-Chromium-Iron Alloy (Precipitation Hardened)', density: 8190, Sc: 300, Sh: 300, E: 200000 },
        'Incoloy 800':    { description: 'Iron-Nickel-Chromium Alloy', density: 7940, Sc: 138, Sh: 138, E: 195000 },
        'Incoloy 825':    { description: 'Nickel-Iron-Chromium Alloy', density: 8140, Sc: 165, Sh: 165, E: 195000 },
        'Hastelloy C276': { description: 'Nickel-Molybdenum-Chromium Alloy', density: 8890, Sc: 207, Sh: 207, E: 205000 },
        'Monel 400':      { description: 'Nickel-Copper Alloy', density: 8800, Sc: 138, Sh: 138, E: 179000 },
        'Nickel 201':     { description: 'Commercially Pure Wrought Nickel', density: 8890, Sc: 100, Sh: 100, E: 204000 },
    };

    const insulationData = {
        'None': { density: 0 },
        'Rockwool': { density: 100 },
        'Fiberglass': { density: 64 },
        'Calcium Silicate': { density: 225 },
    };
    
    const conversionFactors = {
        length: { mm: 1, inch: 1 / 25.4 },
        weight_per_length: { 'kg/m': 1, 'N/m': 9.80665, 'lb/in': 0.00559974 },
        stress: { MPa: 1, psi: 145.038, bar: 10, 'N/mm2': 1 },
    };

    // =================================================================================
    // --- DOM ELEMENT REFERENCES ---
    // =================================================================================

    const ui = {
        pipeSize: document.getElementById('pipe-size'),
        schedule: document.getElementById('schedule'),
        material: document.getElementById('material'),
        contentDensity: document.getElementById('content-density'),
        insulationMaterial: document.getElementById('insulation-material'),
        insulationThickness: document.getElementById('insulation-thickness'),
        calculateBtn: document.getElementById('calculate-btn'),
        lengthUnit: document.getElementById('length-unit'),
        weightUnit: document.getElementById('weight-unit'),
        stressUnit: document.getElementById('stress-unit'),
        odValue: document.getElementById('od-value'),
        wtValue: document.getElementById('wt-value'),
        pipeWeight: document.getElementById('pipe-weight-value'),
        contentWeight: document.getElementById('content-weight-value'),
        insulationWeight: document.getElementById('insulation-weight-value'),
        density: document.getElementById('density-value'),
        sc: document.getElementById('sc-value'),
        sh: document.getElementById('sh-value'),
        ea: document.getElementById('ea-value'),
    };

    // =================================================================================
    // --- STATE MANAGEMENT ---
    // =================================================================================
    
    // Store results in base units (mm, kg, MPa) to allow easy conversion
    let lastResults = {};


    // =================================================================================
    // --- MAIN LOGIC ---
    // =================================================================================

    function populateDropdowns() {
        // Pipe Sizes
        Object.keys(pipeData).forEach(size => ui.pipeSize.add(new Option(size, size)));
        // Materials
        Object.keys(materialData).forEach(mat => ui.material.add(new Option(mat, mat)));
        // Insulation
        Object.keys(insulationData).forEach(mat => ui.insulationMaterial.add(new Option(mat, mat)));
        
        updateSchedules();
    }

    function updateSchedules() {
        const schedules = pipeData[ui.pipeSize.value].schedules;
        ui.schedule.innerHTML = '';
        Object.keys(schedules).forEach(sch => ui.schedule.add(new Option(sch, sch)));
    }

    function calculate() {
        // --- 1. Get data from inputs & lookups ---
        const pipeSizeNPS = ui.pipeSize.value;
        const schedule = ui.schedule.value;
        const materialKey = ui.material.value;

        const od_in = pipeData[pipeSizeNPS].od_in;
        const wt_in = pipeData[pipeSizeNPS].schedules[schedule];
        const materialInfo = materialData[materialKey];
        const insulationInfo = insulationData[ui.insulationMaterial.value];
        
        const contentDensity_kg_m3 = parseFloat(ui.contentDensity.value) || 0;
        const insulationThickness_mm = parseFloat(ui.insulationThickness.value) || 0;

        // --- 2. Perform calculations in base units (mm, kg, MPa) ---
        const od_mm = od_in * 25.4;
        const wt_mm = wt_in * 25.4;
        const id_mm = od_mm - (2 * wt_mm);

        const pipe_area_m2 = (Math.PI / 4) * (Math.pow(od_mm / 1000, 2) - Math.pow(id_mm / 1000, 2));
        const pipe_weight_kg_m = pipe_area_m2 * materialInfo.density;

        const content_area_m2 = (Math.PI / 4) * Math.pow(id_mm / 1000, 2);
        const content_weight_kg_m = content_area_m2 * contentDensity_kg_m3;
        
        const ins_od_mm = od_mm + (2 * insulationThickness_mm);
        const ins_area_m2 = (Math.PI / 4) * (Math.pow(ins_od_mm / 1000, 2) - Math.pow(od_mm / 1000, 2));
        const ins_weight_kg_m = ins_area_m2 * insulationInfo.density;

        // --- 3. Store base results ---
        lastResults = {
            od_mm: od_mm,
            wt_mm: wt_mm,
            pipe_weight_kg_m: pipe_weight_kg_m,
            content_weight_kg_m: content_weight_kg_m,
            ins_weight_kg_m: ins_weight_kg_m,
            material: materialInfo,
        };

        // --- 4. Update UI with converted values ---
        updateUI();
    }

    function updateUI() {
        if (Object.keys(lastResults).length === 0) return; // Don't run if no calculation has been made

        const lenUnit = ui.lengthUnit.value;
        const wgtUnit = ui.weightUnit.value;
        const stressUnit = ui.stressUnit.value;

        // Section 1: Pipe
        const lenFactor = conversionFactors.length[lenUnit];
        ui.odValue.textContent = (lastResults.od_mm * lenFactor).toFixed(3);
        ui.wtValue.textContent = (lastResults.wt_mm * lenFactor).toFixed(3);

        // Section 2: Weight
        const wgtFactor = conversionFactors.weight_per_length[wgtUnit];
        ui.pipeWeight.textContent = (lastResults.pipe_weight_kg_m * wgtFactor).toFixed(3);
        ui.contentWeight.textContent = (lastResults.content_weight_kg_m * wgtFactor).toFixed(3);
        ui.insulationWeight.textContent = (lastResults.ins_weight_kg_m * wgtFactor).toFixed(3);

        // Section 3: Material Properties
        const stressFactor = conversionFactors.stress[stressUnit];
        ui.density.textContent = `${lastResults.material.density} kg/m³`;
        ui.sc.textContent = (lastResults.material.Sc * stressFactor).toFixed(2);
        ui.sh.textContent = (lastResults.material.Sh * stressFactor).toFixed(2);
        ui.ea.textContent = (lastResults.material.E * stressFactor).toFixed(0);
    }

    // =================================================================================
    // --- EVENT LISTENERS ---
    // =================================================================================

    ui.pipeSize.addEventListener('change', () => {
        updateSchedules();
        calculate(); // Also recalculate when size changes
    });
    
    // Recalculate when any input changes for a more responsive feel
    ui.schedule.addEventListener('change', calculate);
    ui.material.addEventListener('change', calculate);
    ui.contentDensity.addEventListener('input', calculate);
    ui.insulationMaterial.addEventListener('change', calculate);
    ui.insulationThickness.addEventListener('input', calculate);

    ui.calculateBtn.addEventListener('click', calculate);
    
    // Listen for changes on unit selectors to re-render UI without full recalculation
    ui.lengthUnit.addEventListener('change', updateUI);
    ui.weightUnit.addEventListener('change', updateUI);
    ui.stressUnit.addEventListener('change', updateUI);


    // =================================================================================
    // --- INITIALIZATION ---
    // =================================================================================

    populateDropdowns();
    calculate(); // Perform an initial calculation on page load

});
