package main.java;

import com.google.gson.Gson;
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

class Image {
	public String name;
	public String userName;
	public String url;
}

public class Main {
	public static void main(String[] args) {
		port(1234);
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase db = mongoClient.getDatabase("REST3");
		MongoCollection<Document> usersCollection = db.getCollection("users");
		MongoCollection<Document> authCollection = db.getCollection("auth");
		MongoCollection<Document> picsCollection = db.getCollection("pics");

		Gson gson = new Gson();

		staticFileLocation("upload");

		Timestamp currentTime = new Timestamp(System.currentTimeMillis());

		post("/api/uploadimage", (request, response) -> {
			//String body = request.body();
			//Image data = gson.fromJson(body, Image.class);

			request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("upload/"));
			Part filepart = request.raw().getPart("uploaded_file");

			try (InputStream inputStream = filepart.getInputStream()) {
				OutputStream outputStream = new FileOutputStream("upload/" + filepart.getSubmittedFileName());
				IOUtils.copy(inputStream, outputStream);
				outputStream.close();
			}

			String time = currentTime.toString();
			String rename = "upload/" + time;
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

			File theFile = new File("upload/" + filepart.getSubmittedFileName());
			File newFile = new File(rename);
			theFile.renameTo(newFile);


			return "lol";
		});
	}

	private static void logInfo(Request req, Path tempFile) throws IOException, ServletException {
		System.out.println("Uploaded file '" + getFileName(req.raw().getPart("uploaded_file")) + "' saved as '" + tempFile.toAbsolutePath() + "'");
	}
}