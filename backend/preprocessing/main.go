package main

import (
	"encoding/csv"
	"fmt"
	"github.com/gocarina/gocsv"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

type Book struct {
	Title         string `csv:"Title"`
	Description   string `csv:"description"`
	Authors       string `csv:"authors"`
	Image         string `csv:"image"`
	PreviewLink   string `csv:"previewLink"`
	Publisher     string `csv:"publisher"`
	PublishedDate string `csv:"publishedDate"`
	InfoLink      string `csv:"infoLink"`
	Categories    string `csv:"categories"`
	RatingsCount  int    `csv:"ratingsCount"`
}

type Rating struct {
	Id                string  `csv:"Id"`
	Title             string  `csv:"Title"`
	Price             float64 `csv:"Price"`
	UserID            string  `csv:"User_id"`
	ProfileName       string  `csv:"profileName"`
	ReviewHelpfulness string  `csv:"review/helpfulness"`
	ReviewScore       int     `csv:"review/score"`
	ReviewTime        string  `csv:"review/time"`
	ReviewSummary     string  `csv:"review/summary"`
	ReviewText        string  `csv:"review/text"`
}

func main() {
	books := buildBooks()
	categoriesMap := createCategoryMap(*books)
	cleanBooks := cleanBooks(*categoriesMap, books)

	//authors := getBookAuthors(cleanBooks)
	//publishers := getBookPublishers(cleanBooks)

	maxYear := getMaxYear(cleanBooks)
	minYear := getMinYear(cleanBooks)
	ratings := buildRatings()
	filteredRatings := buildFilteredRatings(ratings, cleanBooks)
	bookRatingCounts := getBookRatingCount(*filteredRatings)
	bookRatingTotals := getBookRatingTotals(*filteredRatings)
	maxRatingsCount := getMaxRatingCount(*bookRatingCounts, cleanBooks)

	//maxReviewHelpfulness := getMaxHelpfulnessRating(*filteredRatings)
	writeToBooksCsv(cleanBooks, categoriesMap, bookRatingTotals, bookRatingCounts, minYear, maxYear, *maxRatingsCount)
	//writeToRatingCsv(filteredRatings, maxReviewHelpfulness)
}

func getMaxRatingCount(ratings map[string]int, books *[]*Book) *int {
	var maxRatingCount int = 0
	for _, book := range *books {
		if ratings[book.Title] > maxRatingCount {
			maxRatingCount = ratings[book.Title]
		}
	}
	return &maxRatingCount
}

func getNormalizedYear(book *Book, minYear int64, maxYear int64) float64 {
	year, err := strconv.ParseInt(getYear(book), 10, 64)
	if err != nil {
		panic(err)
	}
	return float64(year-minYear) / float64(maxYear-minYear)
}

func getMaxYear(books *[]*Book) int64 {
	var maxYear int64 = 0
	for _, book := range *books {
		year, err := strconv.ParseInt(getYear(book), 10, 64)
		if err != nil {
			panic(err)
		}
		if year > maxYear {
			maxYear = year
		}
	}
	return maxYear
}

func getMinYear(books *[]*Book) int64 {
	var minYear int64 = 2024
	for _, book := range *books {
		year, err := strconv.ParseInt(getYear(book), 10, 64)
		if err != nil {
			panic(err)
		}
		if year < minYear {
			minYear = year
		}
	}
	return minYear
}

func getMaxHelpfulnessRating(ratings []*Rating) *float64 {
	maxHelpfulness := 0.0
	for _, rating := range ratings {

		helpfulness := convertHelpfulnessToFloat(rating)
		if helpfulness > maxHelpfulness {
			maxHelpfulness = helpfulness
		}
	}
	return &maxHelpfulness
}

func convertHelpfulnessToFloat(rating *Rating) float64 {
	nums := strings.Split(rating.ReviewHelpfulness, "/")
	num1, _ := strconv.ParseInt(nums[0], 10, 64)
	num2, _ := strconv.ParseInt(nums[1], 10, 64)
	if num2 == 0 {
		return 0
	}
	return float64(num1) / float64(num2)
}

func getBookRatingTotals(ratings []*Rating) *map[string]int {

	ratingsMap := make(map[string]int)

	for _, rating := range ratings {
		ratingsMap[rating.Title] = ratingsMap[rating.Title] + rating.ReviewScore
	}
	return &ratingsMap
}

func getBookRatingCount(ratings []*Rating) *map[string]int {

	ratingsMap := make(map[string]int)

	for _, rating := range ratings {
		ratingsMap[rating.Title] = ratingsMap[rating.Title] + 1
	}
	return &ratingsMap
}

func getAverageRating(totalRatings *map[string]int, book *Book, ratingCount map[string]int) float64 {
	return float64((*totalRatings)[book.Title]) / float64(ratingCount[book.Title])
}

func buildRatings() *[]*Rating {
	file, err := os.Open("./datasets/Books_rating.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	var ratings []*Rating
	if err := gocsv.UnmarshalFile(file, &ratings); err != nil {
		panic(err)
	}
	return &ratings
}

func buildFilteredRatings(ratings *[]*Rating, cleanedBooks *[]*Book) *[]*Rating {
	var filteredRatings = []*Rating{}

	var cleanedBooksMap = make(map[string]string)

	for _, book := range *cleanedBooks {
		cleanedBooksMap[book.Title] = book.Title
	}

	for _, rating := range *ratings {
		if cleanedBooksMap[rating.Title] != "" && rating.UserID != "" {
			filteredRatings = append(filteredRatings, rating)
		}
	}
	return &filteredRatings
}

func writeToRatingCsv(ratings *[]*Rating, maxReviewHelpfulness *float64) {

	newFile, err := os.Create("./datasets/ratings.csv")
	if err != nil {
		panic(err)
	}
	defer newFile.Close()

	writer := csv.NewWriter(newFile)
	defer writer.Flush()

	header := []string{"ID", "UserID", "Title", "ReviewScore", "ReviewDate", "ReviewHelpfulness"}

	if err := writer.Write(header); err != nil {
		panic(err)
	}

	for _, rating := range *ratings {
		reviewTimeInt, err := strconv.ParseInt(rating.ReviewTime, 10, 64)
		if err != nil {
			panic(err)
		}
		ratingEntry := []string{rating.Id, rating.UserID, rating.Title, fmt.Sprintf("%d", rating.ReviewScore), time.Unix(reviewTimeInt, 0).Format("2006-01-02"), fmt.Sprintf("%f", getNormalizedHelpfulness(rating, maxReviewHelpfulness))}
		if err := writer.Write(ratingEntry); err != nil {
			panic(err)
		}
	}
}

func getNormalizedHelpfulness(rating *Rating, maxReviewHelpfulness *float64) float64 {
	if *maxReviewHelpfulness == 0 {
		return 0
	}
	return convertHelpfulnessToFloat(rating) / *maxReviewHelpfulness
}

func writeToBooksCsv(books *[]*Book, categories *map[string]int, ratingsMap *map[string]int, ratingsCount *map[string]int, minYear int64, maxYear int64, maxRatingsCount int) {

	file, err := os.Create("./datasets/books.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	header := buildBooksCsvHeader(categories)

	if err := writer.Write(*header); err != nil {
		panic(err)
	}

	for _, book := range *books {

		if isBookInList(book, *returnRepeatTitles()) {
			continue
		}

		if err := writer.Write(*buildBooksRowData(book, categories, ratingsMap, *ratingsCount, &minYear, &maxYear, &maxRatingsCount)); err != nil {
			panic(err)
		}
	}
}

func getNormalizedRatingsCount(ratingCount int, maxRatingsCount int) float64 {
	return float64(ratingCount-1) / float64(maxRatingsCount-1)
}

func buildBooksRowData(book *Book, categories *map[string]int, totalRatings *map[string]int, ratingsCount map[string]int, minYear *int64, maxYear *int64, maxRatingsCount *int) *[]string {
	bookEntry := []string{strings.Trim(book.Title, " "),
		book.Authors,
		strings.Trim(book.Publisher, " "),
		fmt.Sprintf("%f", getNormalizedYear(book, *minYear, *maxYear)),
		fmt.Sprintf("%f", getNormalizedRatingsCount(ratingsCount[book.Title], *maxRatingsCount)),
		fmt.Sprintf("%f", getAverageRating(totalRatings, book, ratingsCount)/5)}

	for category, count := range *categories {
		if count > 100 {
			if category == book.Categories {
				bookEntry = append(bookEntry, "1")
			} else {
				bookEntry = append(bookEntry, "0")
			}
		}
	}
	return &bookEntry
}

func buildBooksCsvHeader(categories *map[string]int) *[]string {
	header := []string{"Title", "Authors", "Publisher", "YearPublished", "RatingsCount", "AverageRating"}

	for category, count := range *categories {
		if count > 100 {
			cleanedCategory := "is" + category + "Category"
			cleanedCategory = strings.ReplaceAll(cleanedCategory, "[", "")
			cleanedCategory = strings.ReplaceAll(cleanedCategory, "]", "")
			cleanedCategory = strings.ReplaceAll(cleanedCategory, "'", "")
			cleanedCategory = strings.ReplaceAll(cleanedCategory, " ", "")
			cleanedCategory = strings.ReplaceAll(cleanedCategory, ",", "")
			cleanedCategory = strings.ReplaceAll(cleanedCategory, "&", "And")
			header = append(header, cleanedCategory)
		}
	}
	return &header
}

func cleanBooks(categories map[string]int, books *[]*Book) *[]*Book {
	var cleanedBooks = []*Book{}

	for _, book := range *books {

		if book.RatingsCount > 0 &&
			book.Categories != "" &&
			book.Authors != "" &&
			book.Publisher != "" &&
			categories[book.Categories] > 100 &&
			book.Title != "" &&
			book.PublishedDate != "" {
			cleanedBooks = append(cleanedBooks, book)
		}
	}
	return &cleanedBooks
}

func getBookPublishers(books *[]*Book) *map[string]int {
	var publishers = make(map[string]int)
	for _, book := range *books {
		publishers[book.Publisher] = publishers[book.Publisher] + 1
	}
	return &publishers
}

func getBookAuthors(books *[]*Book) *map[string]int {
	var authors = make(map[string]int)
	for _, book := range *books {
		authors[book.Authors] = authors[book.Authors] + 1
	}
	return &authors
}

func isBookInList(book *Book, titles []string) bool {
	for _, title := range titles {
		if book.Title == title {
			return true
		}
	}
	return false
}

func buildBooks() *[]*Book {
	file, err := os.Open("./datasets/books_data.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var books []*Book
	if err := gocsv.UnmarshalFile(file, &books); err != nil {
		panic(err)
	}
	sortBooks(books)
	return &books
}

func createCategoryMap(books []*Book) *map[string]int {
	var categories = make(map[string]int)
	for _, book := range books {
		if book.RatingsCount < 1 {
			continue
		}
		categories[book.Categories] = categories[book.Categories] + 1
	}
	return &categories
}

func sortBooks(books []*Book) {
	sort.Slice(books, func(i, j int) bool {
		return books[i].RatingsCount > books[j].RatingsCount
	})
}

func getYear(book *Book) string {
	if len(book.PublishedDate) == 4 {
		return book.PublishedDate
	}

	return book.PublishedDate[:4]
}

func returnRepeatTitles() *[]string {
	return &[]string{}
}
