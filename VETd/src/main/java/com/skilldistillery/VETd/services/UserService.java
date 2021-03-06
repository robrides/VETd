package com.skilldistillery.vetd.services;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import com.skilldistillery.vetd.entities.Job;
import com.skilldistillery.vetd.entities.Mentee;
import com.skilldistillery.vetd.entities.MentorMentee;
import com.skilldistillery.vetd.entities.Message;
import com.skilldistillery.vetd.entities.Profile;
import com.skilldistillery.vetd.entities.Review;
import com.skilldistillery.vetd.entities.User;

public interface UserService {

	public List<User> index();

	public List<User> getAllUsers();

	public Mentee getMenteeById(int id);

	public Set<Profile> getMentorsByMenteeUsername(String name);

	public Set<Profile> getMenteesByMentorUsername(String name);

	public Profile updateMentee(Profile profile);

	public Profile addJobstoMentee(Collection<Job> jobs, String username);

	public Profile removeJobsFromMentee(Job job, String name);

	public Profile getProfileById(int id);

	public Profile getProfile(String name);

	public List<Profile> getProfilesByUser_Username(String name);

	public Set<Profile> getMenteesWithJobs(String name);

	public Set<Profile> addMenteeToMentorList(Profile profile, String name);

	public void removeMenteeFromMentorList(Profile profile, String name);

	public Set<Review> getReviewsByProfileId(String name);

	public Set<MentorMentee> addMessage(Message message, String name, int id);

//	public Review postNewReview(Review review, Integer pid);

	public Review postNewReview(Review review, String name, int pid);

	public List<Message> getMessages();

	public List<Profile> getAllProfiles();

}
