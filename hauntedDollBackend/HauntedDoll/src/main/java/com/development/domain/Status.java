package com.development.domain;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 

@XmlRootElement(name = "status") 
public class Status implements Serializable {  
   private static final long serialVersionUID = 1L; 
   private String status; 

   public Status(){} 

   public Status(String status){  
      this.status = status; 
   }  
   
   public String getStatus() { 
      return status; 
   } 
   @XmlElement 
   public void setStatus(String status) { 
      this.status = status; 
   }
}