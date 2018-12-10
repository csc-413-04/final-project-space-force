package main.java;

import com.mongodb.client.*;
import org.bson.Document;
import com.mongodb.MongoClient;

import static spark.Spark.*;
import java.util.*;


public class Main{
	public static void main(String[] args){
		port(1234);
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase db = mongoClient.getDatabase("REST3");
		MongoCollection<Document> usersCollection = db.getCollection("users");
		MongoCollection<Document> authCollection = db.getCollection("auth");
		MongoCollection<Document> picsCollection = db.getCollection("pics");
	}
}