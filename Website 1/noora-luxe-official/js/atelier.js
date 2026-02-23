document.addEventListener('DOMContentLoaded', () => {
    initAtelier();
});

function initAtelier() {
    const optionGroups = document.querySelectorAll('.custom-options');
    const summaryText = document.getElementById('summary-text');
    const resetBtn = document.getElementById('reset-atelier');

    // Store current state
    let selections = {
        fabric: 'Korean Crepe',
        sleeve: 'Kimono Cut',
        length: 'Standard (54")'
    };

    optionGroups.forEach(group => {
        const type = group.dataset.type;
        const buttons = group.querySelectorAll('.opt-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');

                selections[type] = btn.innerText;
                updateSummary();

                // Visual feedback (simulated drape change)
                const visual = document.querySelector('.atelier-visual img');
                visual.style.filter = 'brightness(1.2) contrast(1.1)';
                setTimeout(() => visual.style.filter = 'none', 300);
            });
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    function updateSummary() {
        if (summaryText) {
            summaryText.innerHTML = `Selection: <strong>${selections.fabric} / ${selections.sleeve} / ${selections.length}</strong>`;
        }
    }
}
