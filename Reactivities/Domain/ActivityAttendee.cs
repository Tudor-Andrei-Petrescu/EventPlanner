namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int MyProperty { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public bool isHost { get; set; }
    }
}