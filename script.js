const form = document.getElementById('ia-form');
const resultBox = document.getElementById('ia-result');

function calculateScore(values) {
    const score = { oleosa: 0, seca: 0, mista: 0, normal: 0, sensivel: 0 };

    if (values.q1 === 'oleosa') score.oleosa += 2;
    if (values.q1 === 'seca') score.seca += 2;
    if (values.q1 === 'mista') score.mista += 2;
    if (values.q1 === 'normal') score.normal += 2;

    if (values.q2 === 'sim') score.oleosa += 1;
    if (values.q2 === 'às vezes') score.mista += 1;
    if (values.q2 === 'nao') score.normal += 1;

    return score;
}

function getSkinType(score) {
    const { oleosa, seca, mista, normal, sensivel } = score;
    if (sensivel >= Math.max(oleosa, seca, mista, normal)) return 'Sensível';
    if (oleosa >= Math.max(seca, mista, normal)) return 'Oleosa';
    if (seca >= Math.max(oleosa, mista, normal)) return 'Seca';
    if (mista >= Math.max(oleosa, seca, normal)) return 'Mista';
    return 'Normal';
}

function generateMessage(skinType, focus) {
    let recommendation = '';

    if (skinType === 'Oleosa') {
        recommendation = 'Use limpeza suave, hidratantes oil-free e protetor solar com acabamento matte.';
    } else if (skinType === 'Seca') {
        recommendation = 'Priorize hidratação com cremes ricos e protetor solar hidratante.';
    } else if (skinType === 'Mista') {
        recommendation = 'Equilibre com limpeza leve e hidratantes leves nas áreas secas.';
    } else if (skinType === 'Sensível') {
        recommendation = 'Use fórmulas suaves, sem fragrância e teste cada produto antes de aplicar em todo o rosto.';
    } else {
        recommendation = 'Mantenha rotina simples com limpeza suave, hidratação leve e protetor solar diário.';
    }

    let focusText = '';
    if (focus === 'hidratação') {
        focusText = 'Seu foco é hidratação, então prefira fórmulas nutritivas e suaves.';
    } else if (focus === 'oleosidade') {
        focusText = 'Seu foco é controle de oleosidade, então busque produtos oil-free e matificantes.';
    } else if (focus === 'antiidade') {
        focusText = 'Seu foco é anti-idade, então inclua antioxidantes e ativos suaves.';
    } else if (focus === 'sensibilidade') {
        focusText = 'Seu foco é sensibilidade, então escolha produtos calmantes e sem irritantes.';
    }

    return `Sua pele parece ser ${skinType.toLowerCase()}. ${focusText} ${recommendation}`;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const values = {
        q1: form.q1.value,
        q2: form.q2.value,
        q3: form.q3.value,
    };

    const unanswered = Object.entries(values).filter(([, value]) => !value);
    if (unanswered.length > 0) {
        alert('Por favor, responda todas as 3 perguntas para ver o resultado.');
        return;
    }

    const score = calculateScore(values);
    const skinType = getSkinType(score);
    const message = generateMessage(skinType, values.q3);

    resultBox.innerHTML = `<p class="ia-result__text">${message}</p>`;
    resultBox.scrollIntoView({ behavior: 'smooth' });
});
