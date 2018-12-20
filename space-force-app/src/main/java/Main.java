package main.java;

import com.google.gson.JsonObject;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mongodb.ServerAddress;
import com.mongodb.ServerCursor;
import com.mongodb.client.*;
import org.bson.Document;
import com.mongodb.MongoClient;
//import org.eclipse.jetty.websocket.server.WebSocketHandler;
import spark.Request;
import spark.utils.IOUtils;
import sun.nio.ch.IOUtil;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;

import static com.mongodb.client.model.Filters.eq;
import static jdk.nashorn.internal.objects.NativeError.getFileName;
import static spark.Spark.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.*;
import java.lang.*;
import java.util.regex.Pattern;//To split string

public class Main {
	public static void main(String[] args) {
		port(1234);
		webSocket("/ws", WebSocketHandler.class);
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase db = mongoClient.getDatabase("REST3");
		MongoCollection<Document> usersCollection = db.getCollection("users");
		MongoCollection<Document> authCollection = db.getCollection("auth");
		MongoCollection<Document> picsCollection = db.getCollection("pics");

		ArrayList<Document> posts = picsCollection.find().into(new ArrayList<>());
		ArrayList<String> urls = new ArrayList<>();

		for (Document dc : posts) {
			urls.add(dc.getString("url"));
		}

		Gson gson = new Gson();

		// Slightly more advanced routing
		path("/api", () -> {
			get("/login", (req, res) -> {
				return "Returning";
			});
		});

//		post("/api/uploadimage", (request, response) -> {
//			//String body = request.body();
//			//Image data = gson.fromJson(body, Image.class);
//			staticFileLocation("src/upload");

		post("/api/uploadimage", (request, response) -> {
			request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("src/upload/"));
			Part filepart = request.raw().getPart("uploaded_file");
			Timestamp currentTime = new Timestamp(System.currentTimeMillis());

			try (InputStream inputStream = filepart.getInputStream()) {
				OutputStream outputStream = new FileOutputStream("src/upload/" + filepart.getSubmittedFileName());
				IOUtils.copy(inputStream, outputStream);
				outputStream.close();
			}

			String time = currentTime.toString();
			String rename = "upload/" + time;
			switch (filepart.getContentType()) {
				case "image/jpeg":
					rename += ".jpg";
					break;
				case "image/png":
					rename += ".png";
					break;
				default:
					System.out.println("Invalid Data Type");
			}

			File theFile = new File("upload/" + filepart.getSubmittedFileName());
			File newFile = new File(rename);
			theFile.renameTo(newFile);

			urls.add(rename);
			JsonObject broadcastPost = new JsonObject();
			broadcastPost.addProperty("type", "POST_BROADCAST");
			broadcastPost.addProperty("time", time);
			broadcastPost.addProperty("url", rename);

			WebSocketHandler.broadcast(broadcastPost.toString());
			Document dc = new Document("url", rename);
			picsCollection.insertOne(dc);
			return "lol";
		});

		//NewUser
		post("/api/signup", (req, res) -> {
			String body = req.body().toString();
			System.out.println(body);

			//Return all pairs of data from request
			String[] myElements = parserToReturnJsonString(body);

			//Receive input and parse into the variables below
			//username is the first param of newuser
			String username = "";
			//password is the second param of newuser
			String password = "";

			for (int i = 0; i < myElements.length; i++) {
				String[] mySplitItems = parserToReturnItems(myElements[i]);
				for (int j = 0; j < mySplitItems.length; j++) {
					mySplitItems = parserToReturnItems(myElements[i]);
					if (mySplitItems[j].equals("username")) {
						username = mySplitItems[j + 1];
						System.out.println(username);

					}
					if (mySplitItems[j].equals("password")) {
						password = mySplitItems[j + 1];
						System.out.println(password);

					}
				}
			}

			System.out.print("New user: " + username + " created\n");
			Document dc = new Document("username", username);
			List<Document> friends = new ArrayList<Document>();
			dc.append("username", username).append("password", password).append("friends", friends);
			usersCollection.insertOne(dc);


			return "okay";

		});


		post("/api/login", (req, res) -> {
			String body = req.body().toString();
//			System.out.println(body);

			//Return all pairs of data from request
			String[] myElements = parserToReturnJsonString(body);

			//Receive input and parse into the variables below
			//username is the first param of newuser
			//System.out.println("Hello World");
			String un = "";
			//password is the second param of newuser
			String pw = "";

			for (int i = 0; i < myElements.length; i++) {
				String[] mySplitItems = parserToReturnItems(myElements[i]);
				for (int j = 0; j < mySplitItems.length; j++) {
					mySplitItems = parserToReturnItems(myElements[i]);
					if (mySplitItems[j].equals("username")) {
						un = mySplitItems[j + 1];
						System.out.println(un);

					}
					if (mySplitItems[j].equals("password")) {
						pw = mySplitItems[j + 1];
						System.out.println(pw);

					}
				}
			}

			Document user = usersCollection.find(eq("username", un)).first();
			String rightPassword = user.getString("password");
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			Document token = new Document();
			if (pw.equals(rightPassword)) {
				token.append("username", un);
				String currentT = Long.toString(timestamp.getTime());
				token.append("token", currentT);
				authCollection.insertOne(token);
				return currentT;
			} else {
				return "login_failed";
			}
		});
	}
//
//			path("/api", () -> {
//				get("/urls", (request, response) -> {
//					return gson.toJson(urls);
//				});
//			});

		private static void logInfo (Request req, Path tempFile) throws IOException, ServletException {
			System.out.println("Uploaded file '" + getFileName(req.raw().getPart("uploaded_file")) + "' saved as '" + tempFile.toAbsolutePath() + "'");
		}


		private static String[] parserToReturnJsonString (String s){
			String[] myNewString = s.split("\\{");
			String myString = myNewString[1];
			s = myString.replace("\"", "");
			myNewString = s.split("\\}");
			myString = myNewString[0];
			return myString.split(",");
		}

		public static String[] parserToReturnItems (String s){
			return s.split(":");
		}
}