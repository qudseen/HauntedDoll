package com.development.domain;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name = "user") 
public class User implements Serializable {  
   private static final long serialVersionUID = 1L; 
   private int id; 
   private String name; 
   private String username;
   private String email;

   public User(){} 
   
   public User(int id, String name, String username, String email){  
      this.id = id; 
      this.name = name; 
      this.username = username;
      this.email = email;
   }  
   
   public int getId() { 
      return id; 
   }  
   @XmlElement 
   public void setId(int id) { 
      this.id = id; 
   } 

   public String getName() { 
      return name; 
   } 
   @XmlElement 
   public void setName(String name) { 
      this.name = name; 
   }

	public String getUsername() {
		return username;
	}
	 @XmlElement 
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getEmail() {
		return email;
	}
	 @XmlElement 
	public void setEmail(String email) {
		this.email = email;
	}
	
}