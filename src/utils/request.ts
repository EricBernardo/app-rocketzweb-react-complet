import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'O servidor retornou com sucesso os dados solicitados.',
   201: 'Dados novos ou modificados são bem-sucedidos.',
   202: 'Uma solicitação entrou na fila de segundo plano (tarefa assíncrona).',
   204: 'Excluir dados com sucesso.',
   400: 'A solicitação foi enviada com erro. O servidor não executou nenhuma operação para criar ou modificar dados.',
   401: 'O usuário não tem permissão (token, nome de usuário, senha está incorreta).',
   403: 'O usuário está autorizado, mas o acesso é proibido.',
   404: 'A solicitação enviada é para um registro que não existe e o servidor não está operando.',
   406: 'O formato da solicitação não está disponível.',
   410: 'O recurso solicitado é excluído permanentemente e não será obtido novamente.',
   422: 'Ao criar um objeto, ocorreu um erro de validação.',
   500: 'O servidor está com um erro. Verifique o servidor.',
   502: 'Erro no gateway.',
   503: 'O serviço está indisponível, o servidor está temporariamente sobrecarregado ou mantido.',
   504: 'O gateway expirou.',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Erro de solicitação ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Ocorreu uma anormalidade na sua rede, incapaz de se conectar ao servidor',
      message: 'Exceção de rede',
    });
  }
  return response;
};

const request = extend({
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2MmFiNmI3MGM1ZmE2MGY5MGYzYTIxZWI2MjkxNGE1M2JhNzAwMjdlM2Y0YTg4NGYzYWNkOGRjYjkxYzk4MGRmZDM0OWYzYmIyZjI4NTk1In0.eyJhdWQiOiIxIiwianRpIjoiNDYyYWI2YjcwYzVmYTYwZjkwZjNhMjFlYjYyOTE0YTUzYmE3MDAyN2UzZjRhODg0ZjNhY2Q4ZGNiOTFjOTgwZGZkMzQ5ZjNiYjJmMjg1OTUiLCJpYXQiOjE1Njc3Mjg0NzEsIm5iZiI6MTU2NzcyODQ3MSwiZXhwIjoxNTk5MzUwODcxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.qFYnVn7zDb1TJUpMWC7agoqVnmhkb2rOZqq2ZVPoPJRuas9uld_1YkTHZnMWYK4JbvFyQlE4G1aiKbbuq-Lgl5ctZWMhDkpMQ0hKG-UGa4sy4HNxKTkQ8-NMQ1iQMF5E-FEOAxq7m5lhJ_lMaGIGuUisFmcv105EJedLD-oYWit2wb_PLUsbbV251ZQc7G0qtO4W5HIw2xxkNv8sosEqdKTmCybkYjtI7GsS28bO7LLX83iluMhpHQGHUXVkAlMlcRTqXoymaUEeClh34xIVD6Ku3M5LmKrG3ohdciRpKDs60tE_AS2juzpoPbS9PHccHhl-aOvf-PJpaWB3z7MGSqBlSDIHpb2va0sMOgIR-P1suvLBs269xt80YGBvLoSqE4LP1yZDWLunLL9Ko65fOBhB5B9qHFWQqWLBJDW5Q0_pBnucY8XnaVayKsC4GcJpx7dSwWChZfM8LDxn1fYzu1JJYIQQg7NQQ3I2u4vg5DYVUrP3FOEAcZA_9nTQkWwcQ1ekTl6Lfx_GvQO1sgFqOvKRcX3SLhBVme4cmg7gYUFhxsFd7XQF3YmybveFVLFDFYczXhjczL4EYBAnWqzzHvA4osqbDeV6kCI6e6FDcIkQkYqGtTOfErYDPZb9Nr1PpJrHQGPNinZXXEYLQAKy1_4ZacpGoN7RJUia8J_l6j8'
  },
  prefix: 'http://api.rocketzweb.kinghost.net/api',
  errorHandler  
});

export default request;
