package com.development.domain;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name = "order") 
public class Order implements Serializable {  
   private static final long serialVersionUID = 1L; 

   private int id;
   private String address; 
   private String username;
   private String dollName;
   private String dollSize;
   private int day;
   private int status;
   private List<String> extras;

   public Order(){} 
   
   public Order(int id, String name, String address, String dollName, String dollSize, int day, int status, List<String> extras){  
      this.id = id;
      this.address = address;
      this.username = name;
      this.dollName = dollName;
      this.dollSize = dollSize;
      this.day = day;
      this.status = status;
      this.extras = extras;
   }  

   public int getId() {
		return id;
	}
   @XmlElement 
	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}
   @XmlElement 
	public void setAddress(String address) {
		this.address = address;
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

	public int getDay() {
		return day;
	}
	@XmlElement
	public void setDay(int day) {
		this.day = day;
	}

	public int getStatus() {
		return status;
	}
	@XmlElement
	public void setStatus(int status) {
		this.status = status;
	}

	public List<String> getExtras() {
		return extras;
	}
	@XmlElement
	public void setExtras(List<String> extras) {
		this.extras = extras;
	}

	public String getUsername() {
		return username;
	}
	@XmlElement
	public void setUsername(String username) {
		this.username = username;
	}

	public void addExtras(String extra) {
		this.extras.add(extra);
	}

}