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
import java.util.*;

class Image {
	public String name;
	public int size;
	public String type;
	public int lastModified;
	public String webkitRelativePath;
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
		File uploadDir = new File("upload");
		uploadDir.mkdir();

		staticFiles.externalLocation("upload");

		get("/api/uploadimage", ((request, response) ->
				"<form method='post' enctype='multipart/form-data'>" // note the enctype
						+ "    <input type='image/jpeg' name='uploaded_file' accept='.jpg'>" // make sure to call getPart using the same "name" in the post
						+ "    <button>Upload picture</button>"
						+ "</form>"
		));

		post("/api/uploadimage", (request, response) -> {
			Path temp = Files.createTempFile(uploadDir.toPath(), "", "");
			request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("upload"));

			Part filePart = null;
			try {
				filePart = request.raw().getPart("uploaded_file");
				InputStream input = filePart.getInputStream();
				OutputStream output = new FileOutputStream("/temp" + filePart.getSubmittedFileName());
				IOUtils.copy(input, output);
				output.close();
				input.close();
			} catch (IOException | ServletException e) {
				e.printStackTrace();
			}

			logInfo(request, temp);
			return "lol";
		});
	}

	private static void logInfo(Request req, Path tempFile) throws IOException, ServletException {
		System.out.println("Uploaded file '" + getFileName(req.raw().getPart("uploaded_file")) + "' saved as '" + tempFile.toAbsolutePath() + "'");
	}
}