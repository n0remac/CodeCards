// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: proto/blog/blog.proto

package blogconnect

import (
	blog "cards/gen/proto/blog"
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect_go.IsAtLeastVersion0_1_0

const (
	// BlogServiceName is the fully-qualified name of the BlogService service.
	BlogServiceName = "blog.BlogService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// BlogServiceCreatePostProcedure is the fully-qualified name of the BlogService's CreatePost RPC.
	BlogServiceCreatePostProcedure = "/blog.BlogService/CreatePost"
	// BlogServiceGetPostsProcedure is the fully-qualified name of the BlogService's GetPosts RPC.
	BlogServiceGetPostsProcedure = "/blog.BlogService/GetPosts"
)

// BlogServiceClient is a client for the blog.BlogService service.
type BlogServiceClient interface {
	CreatePost(context.Context, *connect_go.Request[blog.CreatePostRequest]) (*connect_go.Response[blog.CreatePostResponse], error)
	GetPosts(context.Context, *connect_go.Request[blog.GetPostsRequest]) (*connect_go.Response[blog.GetPostsResponse], error)
}

// NewBlogServiceClient constructs a client for the blog.BlogService service. By default, it uses
// the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewBlogServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) BlogServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &blogServiceClient{
		createPost: connect_go.NewClient[blog.CreatePostRequest, blog.CreatePostResponse](
			httpClient,
			baseURL+BlogServiceCreatePostProcedure,
			opts...,
		),
		getPosts: connect_go.NewClient[blog.GetPostsRequest, blog.GetPostsResponse](
			httpClient,
			baseURL+BlogServiceGetPostsProcedure,
			opts...,
		),
	}
}

// blogServiceClient implements BlogServiceClient.
type blogServiceClient struct {
	createPost *connect_go.Client[blog.CreatePostRequest, blog.CreatePostResponse]
	getPosts   *connect_go.Client[blog.GetPostsRequest, blog.GetPostsResponse]
}

// CreatePost calls blog.BlogService.CreatePost.
func (c *blogServiceClient) CreatePost(ctx context.Context, req *connect_go.Request[blog.CreatePostRequest]) (*connect_go.Response[blog.CreatePostResponse], error) {
	return c.createPost.CallUnary(ctx, req)
}

// GetPosts calls blog.BlogService.GetPosts.
func (c *blogServiceClient) GetPosts(ctx context.Context, req *connect_go.Request[blog.GetPostsRequest]) (*connect_go.Response[blog.GetPostsResponse], error) {
	return c.getPosts.CallUnary(ctx, req)
}

// BlogServiceHandler is an implementation of the blog.BlogService service.
type BlogServiceHandler interface {
	CreatePost(context.Context, *connect_go.Request[blog.CreatePostRequest]) (*connect_go.Response[blog.CreatePostResponse], error)
	GetPosts(context.Context, *connect_go.Request[blog.GetPostsRequest]) (*connect_go.Response[blog.GetPostsResponse], error)
}

// NewBlogServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewBlogServiceHandler(svc BlogServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	blogServiceCreatePostHandler := connect_go.NewUnaryHandler(
		BlogServiceCreatePostProcedure,
		svc.CreatePost,
		opts...,
	)
	blogServiceGetPostsHandler := connect_go.NewUnaryHandler(
		BlogServiceGetPostsProcedure,
		svc.GetPosts,
		opts...,
	)
	return "/blog.BlogService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case BlogServiceCreatePostProcedure:
			blogServiceCreatePostHandler.ServeHTTP(w, r)
		case BlogServiceGetPostsProcedure:
			blogServiceGetPostsHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedBlogServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedBlogServiceHandler struct{}

func (UnimplementedBlogServiceHandler) CreatePost(context.Context, *connect_go.Request[blog.CreatePostRequest]) (*connect_go.Response[blog.CreatePostResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("blog.BlogService.CreatePost is not implemented"))
}

func (UnimplementedBlogServiceHandler) GetPosts(context.Context, *connect_go.Request[blog.GetPostsRequest]) (*connect_go.Response[blog.GetPostsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("blog.BlogService.GetPosts is not implemented"))
}