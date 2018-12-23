package main.java;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mongodb.ServerAddress;
import com.mongodb.ServerCursor;
import com.mongodb.client.*;
import org.bson.Document;
import com.mongodb.MongoClient;
import spark.Request;
import spark.utils.IOUtils;
import sun.nio.ch.IOUtil;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;

import static jdk.nashorn.internal.objects.NativeError.getFileName;
import static spark.Spark.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.*;

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

		for (Document dc : posts){
			urls.add(dc.getString("url"));
		}

		Gson gson = new Gson();

		staticFileLocation("src/upload");

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
			String rename = "src/upload/" + time;
			switch (filepart.getContentType()){
				case "image/jpeg":
					rename += ".jpg";
					break;
				case "image/png":
					rename += ".png";
					break;
				default:
					System.out.println("Invalid Data Type");
			}

			File theFile = new File("src/upload/" + filepart.getSubmittedFileName());
			File newFile = new File(rename);
			theFile.renameTo(newFile);

			String filePath = "../../" + rename;
			urls.add(rename);
			JsonObject broadcastPost = new JsonObject();
			broadcastPost.addProperty("type", "POST_BROADCAST");
			broadcastPost.addProperty("url", filePath);

			WebSocketHandler.broadcast(broadcastPost.toString());
			Document dc = new Document("url", filePath);
			picsCollection.insertOne(dc);
			return "lol";
		});

		path("/api", () ->{
			get("/urls", (request, response) -> {
				return gson.toJson(urls);
			});
		});

	}

	private static void logInfo(Request req, Path tempFile) throws IOException, ServletException {
		System.out.println("Uploaded file '" + getFileName(req.raw().getPart("uploaded_file")) + "' saved as '" + tempFile.toAbsolutePath() + "'");
	}
}