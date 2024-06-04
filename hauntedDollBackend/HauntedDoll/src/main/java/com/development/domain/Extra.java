package com.development.domain;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name = "extra") 
public class Extra implements Serializable {  
   private static final long serialVersionUID = 1L; 
   private int id;
   private String name; 

   public Extra(){} 
   
   public Extra(int id, String name){  
      this.id = id; 
      this.name = name; 
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
}