package com.skilldistillery.vetd.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Mentee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String story;
	
	@Column(name = "created_at")
	@CreationTimestamp
	private Date createdAt;
	
	@OneToMany(mappedBy = "mentee")
	@JsonIgnore
	private Set<MentorMentee> mentorMentee;
	
	@ManyToMany(mappedBy = "mentees", cascade = CascadeType.ALL)
	private Set<Job> jobs;
	
	@OneToOne
	@JoinColumn(name = "profile_id")
	@JsonIgnore
	private Profile profile;
	
	
	
	

	public Profile getProfile() {
		return profile;
	}
	public void setProfile(Profile profile) {
		this.profile = profile;
	}
	public Set<MentorMentee> getMentorMentee() {
		return mentorMentee;
	}
	public void setMentorMentee(Set<MentorMentee> mentorMentee) {
		this.mentorMentee = mentorMentee;
	}
	public Set<Job> getJobs() {
		return jobs;
	}
	public void setJobs(Set<Job> jobs) {
		this.jobs = jobs;
	}

	public void addJob(Job job) {
		if(this.jobs == null) {
			this.jobs = new HashSet<Job>();
		}
		this.jobs.add(job);
		job.getMentees().add(this);
	}
	public void removeJob(Job job) {
		System.out.println(job);
//		if(this.jobs == null) {
//			return;
//		}
//		for (int i = 0; i < jobs.size(); i++) {
//			if(job.getId() == jobs.(i).getId()) {
//				jobs.remove(i);
//			}
//		}
//		job.getMentees().remove(this);
//		for(int i = 0; i < job.getMentees().size(); i++) {
//			if(this.getId() == job.getMentees().get(i).getId()) {
//				job.getMentees().remove(i);
//			}
//		}
		if(this.jobs == null) {
			return;
		}
		this.jobs.remove(job);
		job.getMentors().remove(this);
	
		System.out.println(this.jobs);
	}
	
	public void addMentorMentees(MentorMentee mm) {
		if(this.mentorMentee == null) {
			this.mentorMentee = new HashSet<>();
		}
		this.mentorMentee.add(mm);
			
	}
	public void removeMentorMentees(MentorMentee mm) {
		if(this.mentorMentee == null) {
			return;
		}
		if(this.mentorMentee.contains(mm)) {
			this.mentorMentee.remove(mm);
		}
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStory() {
		return story;
	}
	public void setStory(String story) {
		this.story = story;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Mentee(int id, String story, Date createdAt) {
		super();
		this.id = id;
		this.story = story;
		this.createdAt = createdAt;
	}
	public Mentee() {
		super();
	}
	@Override
	public String toString() {
		return "Mentee [id=" + id + ", story=" + story + ", createdAt=" + createdAt + ", jobs=" + jobs + ", profile="
				+ profile + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Mentee other = (Mentee) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
}
