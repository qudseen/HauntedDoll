package com.development.domain;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name = "cart") 
public class Cart implements Serializable {  
   private static final long serialVersionUID = 1L; 

   private int id;
   private String username;
   private String dollName;
   private String dollSize;
   private String extras;

   public Cart(){} 
   
   public Cart(int id, String name, String dollName, String dollSize, String extras){  
      this.id = id;
      this.username = name;
      this.dollName = dollName;
      this.dollSize = dollSize;
      this.extras = extras;
   }  

   public int getId() {
		return id;
	}
   @XmlElement 
	public void setId(int id) {
		this.id = id;
	}

	public String getDollName() {
		return dollName;
	}
	@XmlElement
	public void setDollName(String dollName) {
		this.dollName = dollName;
	}

	public String getDollSize() {
		return dollSize;
	}
	@XmlElement
	public void setDollSize(String dollSize) {
		this.dollSize = dollSize;
	}

	public String getExtras() {
		return extras;
	}
	@XmlElement
	public void setExtras(String extras) {
		this.extras = extras;
	}

	public String getUsername() {
		return username;
	}
	@XmlElement
	public void setUsername(String username) {
		this.username = username;
	}

}