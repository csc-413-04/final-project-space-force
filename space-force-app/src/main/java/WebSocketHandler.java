package spark;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;
//import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
//import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
//import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
//import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.*;
import java.util.*;
import java.util.concurrent.*;

@WebSocket
public class WebSocketHandler {
	static Map<Session, Session> sessionMap= new ConcurrentHashMap<>();
	public static void broadcast (String message){
		sessionMap.keySet().stream().filter(Session::isOpen).forEach(session-> {
			try{
				session.getRemote().sendString(message);
			}
			catch(Exception e){
				e.printStackTrace();;
			}
		});

	}



	@OnWebSocketConnect
	public void connected(Session session){
		System.out.println("A client has connected");
		//sessionMap[session] = session;
		sessionMap.put(session,session);
	}

	@OnWebSocketClose
	public void closed(Session session, int statusCode, String reason) {
		System.out.println("A client has disconnected");
		sessionMap.remove(session);
	}

	@OnWebSocketMessage
	public void message(Session session, String message) throws IOException {
		System.out.println("Got: $message");
		session.getRemote().sendString("A message");
	}
}
