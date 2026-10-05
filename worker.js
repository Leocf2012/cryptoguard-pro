export default {
  async fetch(request, env) {
    const cabecalhoCORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Responde requisição de verificação do navegador
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cabecalhoCORS });
    }

    try {
      // Lê os dados enviados
      let dados;
      try {
        dados = await request.json();
      } catch {
        dados = {};
      }
      
      const endereco = dados.endereco || "";

      // Detecta rede
      let rede = "Desconhecida";
      if (endereco.startsWith("0x") && endereco.length === 42) {
        rede = "EVM (Ethereum/BSC)";
      } else if (endereco.length === 43 && !endereco.startsWith("0x")) {
        rede = "Solana";
      }

      // Responde SEMPRE com JSON válido
      return Response.json({
        sucesso: true,
        rede: rede,
        endereco: endereco,
        mensagem: "✅ Worker está funcionando!"
      }, { headers: cabecalhoCORS });

    } catch (erro) {
      return Response.json({
        sucesso: false,
        erro: erro.message
      }, { status: 200, headers: cabecalhoCORS });
    }
  }
};
