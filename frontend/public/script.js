async function askAI() {
    const question = document.getElementById('userQuestion').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = "Loading...";
    
    try {
        const res = await fetch('/api/ask-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });
        const data = await res.json();
        responseDiv.innerHTML = `<p><strong>Antwoord:</strong> ${data.answer}</p>`;
    } catch (error) {
        responseDiv.innerHTML = "<p style='color:red;'>Er is een fout opgetreden. Probeer opnieuw.</p>";
    }
}

askAI();