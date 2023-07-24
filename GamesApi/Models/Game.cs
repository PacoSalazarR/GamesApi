namespace GamesApi.Models
{
    public class Game
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Genre { get; set; }
        public string? Description { get; set; }
        public int? Year { get; set; }
    }
}
