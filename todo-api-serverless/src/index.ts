// src/index.ts

// --- Importaciones ---
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient, 
  ScanCommand,  
  PutCommand    
} from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";

// --- Configuración Inicial de AWS ---

// Inicializa el cliente estándar de DynamoDB
const client = new DynamoDBClient({});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || 'tec-practicantes-todo';

/**
 * Función de ayuda para crear respuestas HTTP estandarizadas
 */
const createResponse = (statusCode: number, body: unknown): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Habilita CORS para cualquier origen
      "Access-Control-Allow-Methods": "GET,POST",
    },
    body: JSON.stringify(body),
  };
};

// --- El Handler Principal ---
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return await handleGetRequest();
      case 'POST':
        return await handlePostRequest(event);
      default:
        return createResponse(405, { message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    const message = (error instanceof Error) ? error.message : "Internal server error";
    return createResponse(500, { message });
  }
};

// --- Lógica para el Método GET ---
const handleGetRequest = async (): Promise<APIGatewayProxyResult> => {
  const command = new ScanCommand({ 
    TableName: TABLE_NAME 
  });

  const response = await docClient.send(command);

  return createResponse(200, response.Items || []);
};

// --- Lógica para el Método POST ---
const handlePostRequest = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  if (!event.body) {
    return createResponse(400, { message: "Bad Request: El cuerpo (body) de la petición está vacío." });
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return createResponse(400, { message: "Bad Request: El formato del JSON no es válido." });
  }

  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    return createResponse(400, { message: "Bad Request: El campo 'title' es requerido y debe ser un string." });
  }

  // --- Creación del Objeto ---
  const newItem = {
    id: randomUUID(),       
    title: data.title.trim(), 
    completed: false          
  };

  // --- Guardado en DynamoDB ---
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: newItem,
  });

  await docClient.send(command);

  return createResponse(200, newItem);
};