package main.java;

import java.io.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;

@WebSocket
public class WebSocketHandler {
	static Map<Session, Session> sessionMap = new ConcurrentHashMap<>();

	public static void broadcast(String url){
		sessionMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
			try {
				session.getRemote().sendString(url);
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
	}

	@OnWebSocketMessage
	public void message(Session session, String url) throws IOException {
		System.out.println("Got: $image");
		session.getRemote().sendString("a new image");
	}
}
